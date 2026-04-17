// Built-in fetch used

async function testValidation() {
    const baseUrl = 'http://localhost:5000/api';
    
    // 1. Create a test product
    console.log('Creating test product...');
    const productRes = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "Test Validation Phone",
            brand: "Testing",
            price: 500,
            images: ["http://example.com/test.jpg"],
            releaseDate: "2026-04-10T00:00:00.000Z"
        })
    });
    const product = await productRes.json();
    console.log(`Created product with ID: ${product._id}, Release Date: ${product.releaseDate}`);

    // 2. Try to submit a review with purchaseDate before releaseDate
    console.log('\nSubmitting invalid review (before release)...');
    const invalidRes = await fetch(`${baseUrl}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productId: product._id,
            rating: 5,
            comment: "This is a long enough comment to pass the length validation check of fifty characters.",
            reviewer: "Tester",
            usageDuration: "1 month",
            purchaseDate: "2026-04-05T00:00:00.000Z", // BEFORE RELEASE
            recommend: "Yes"
        })
    });
    const invalidData = await invalidRes.json();
    console.log(`Response Status: ${invalidRes.status}`);
    console.log(`Response Message: ${invalidData.message}`);

    // 3. Submit a valid review
    console.log('\nSubmitting valid review (after release)...');
    const validRes = await fetch(`${baseUrl}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productId: product._id,
            rating: 5,
            comment: "This is another long enough comment to pass the length validation check of fifty characters.",
            reviewer: "Tester",
            usageDuration: "2 days",
            purchaseDate: "2026-04-15T00:00:00.000Z", // AFTER RELEASE
            recommend: "Yes"
        })
    });
    const validData = await validRes.json();
    console.log(`Response Status: ${validRes.status}`);
    console.log(`Response Message: ${validData.message || 'Success'}`);
}

testValidation().catch(console.error);
