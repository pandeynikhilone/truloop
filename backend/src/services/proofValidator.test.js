import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateProof } from "./proofValidator.js";

describe("validateProof", () => {
  it("accepts a missing proof when receipt uploads are optional", async () => {
    assert.deepEqual(await validateProof("", "Example product"), { isValid: true });
  });

  it("rejects malformed data URLs", async () => {
    const actual = await validateProof("not-a-data-url", "Example product");
    assert.equal(actual.isValid, false);
    assert.match(actual.message, /Invalid file format/i);
  });

  it("rejects unsupported MIME types before attempting OCR", async () => {
    const actual = await validateProof("data:text/plain;base64,Zm9v", "Example product");
    assert.equal(actual.isValid, false);
    assert.match(actual.message, /Unsupported file type/i);
  });
});
