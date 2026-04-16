import Tesseract from "tesseract.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

/**
 * Validates if the uploaded proof (base64) is a valid receipt for the given product.
 * @param {string} proofBase64 - The base64 string of the uploaded file.
 * @param {string} productName - The name of the product being reviewed.
 * @returns {Promise<{isValid: boolean, message?: string}>}
 */
export const validateProof = async (proofBase64, productName) => {
  if (!proofBase64) return { isValid: true }; // No proof provided (optional in some cases)

  try {
    // 1. Extract data and type from base64
    const matches = proofBase64.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return { isValid: false, message: "Invalid file format. Please upload a valid image or PDF." };
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    let extractedText = "";

    console.log(`Validating proof for product: ${productName} (Type: ${mimeType})`);

    // 2. Extract text based on file type
    if (mimeType.startsWith("image/")) {
      const { data: { text } } = await Tesseract.recognize(buffer, "eng");
      extractedText = text;
    } else if (mimeType === "application/pdf") {
      try {
        let data;
        // Handle different versions of pdf-parse exports
        if (typeof pdf === "function") {
          data = await pdf(buffer);
        } else if (pdf && typeof pdf.PDFParse === "function") {
          data = await pdf.PDFParse(buffer);
        } else if (pdf && pdf.default && typeof pdf.default === "function") {
          data = await pdf.default(buffer);
        } else {
          console.error("PDF-PARSE STRUCTURE:", typeof pdf, Object.keys(pdf || {}));
          throw new Error("PDF parser library is not configured correctly.");
        }
        
        extractedText = data.text;
        console.log("PDF parsed successfully. Extracted text length:", extractedText?.length);
      } catch (pdfError) {
        console.error("PDF-PARSE ERROR:", pdfError);
        return { isValid: false, message: `Failed to parse PDF content: ${pdfError.message}` };
      }
    } else {
      return { isValid: false, message: "Unsupported file type. Please upload an image or PDF." };
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return { isValid: false, message: "Could not read any text from the file. Please ensure it is a clear receipt." };
    }

    // 3. Validation Logic
    const textLower = extractedText.toLowerCase();
    const productNameLower = productName.toLowerCase();

    // Keywords that indicate it's a receipt
    const receiptKeywords = ["receipt", "invoice", "order", "total", "amount", "price", "purchased", "tax", "billing"];
    const hasReceiptKeywords = receiptKeywords.some(kw => textLower.includes(kw));

    // Check for product name
    // We check if the full name exists, OR if significant parts of the name exist
    const hasFullName = textLower.includes(productNameLower);
    
    // Split product name into words and filter out common short words
    const productWords = productNameLower.split(/\s+/).filter(w => w.length > 2);
    const matchedWordsCount = productWords.filter(word => textLower.includes(word)).length;
    const hasSignificantPart = productWords.length > 0 && matchedWordsCount / productWords.length >= 0.5;

    console.log("Validation Results:", { hasReceiptKeywords, hasFullName, matchedWordsCount, totalWords: productWords.length });

    // Validation Rules:
    // It must either have the full product name, 
    // OR it must look like a receipt (keywords) AND have at least 50% of the product name words.
    if (hasFullName || (hasReceiptKeywords && hasSignificantPart)) {
      return { isValid: true };
    }

    return { 
      isValid: false, 
      message: `The uploaded proof does not mention "${productName}" or doesn't look like a valid receipt. Please upload a clear receipt of this specific product.` 
    };

  } catch (error) {
    console.error("Detailed Proof validation error:", error);
    // If OCR fails for some technical reason, we might want to log it and decide whether to let it pass
    // For now, let's be strict but give a generic message
    return { isValid: false, message: `Error processing the uploaded file: ${error.message || "Unknown error"}. Please try a different image or PDF.` };
  }
};
