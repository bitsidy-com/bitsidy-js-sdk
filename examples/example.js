const BitsidySDK = require('../');

const bitsidySDK = new BitsidySDK('your_api_key', 'your_store_id');
const invoiceData = {
    currency: 'BTC', // Required: Cryptocurrency code, e.g., 'BTC' for Bitcoin.
    amount: 10, // Required: Amount in USD.
    email: 'payer@example.com', // Required: Email of the payer.
    callbackNotify: 'https://yourdomain.com/callback.php', // Required: Your callback URL.
    customString: 'Payment for Product XYZ', // Optional: Custom string for the invoice.
    orderId: 'order123' // Optional: Your local order ID.
};

async function createInvoice() {
    try {
        const response = await bitsidySDK.createInvoice(invoiceData);

        if (!response) {
            console.log('Error creating invoice. Check the console for more details.');
            return;
        }

        const transactionId = response.transactionId;
        const paymentLink = response.paymentLink;
        const status = response.status;
        const amount = response.amount;
        const customString = response.customString;
        const email = response.email;
        const orderId = response.orderId;

        console.log('Transaction ID:', transactionId); // A unique identifier for the transaction.
        console.log('Payment Link:', paymentLink); // Payment link to redirect your clients to.
        console.log('Status:', status); // Invoice status, initially 'wait'.
        console.log('Amount:', amount); // The amount of the invoice in the specified cryptocurrency.
        console.log('Custom String:', customString); // The custom string passed to the invoice creation method.
        console.log('Email:', email); // The customer's email passed to the invoice creation method.
        console.log('Order ID:', orderId); // Your local order ID passed to the invoice creation method.

    } catch (error) {
        console.error('Error creating invoice:', error);
    }
}

createInvoice();