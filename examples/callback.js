const express = require('express');
const bodyParser = require('body-parser');
const BitsidySDK = require('../');

const app = express();
app.use(bodyParser.json());

app.post('/callback-url', async (req, res) => {
    const encryptedData = req.body.data;

    const bitsidySDK = new BitsidySDK('your_api_key', 'your_store_id');
    let decryptedData;
    try {
        decryptedData = await bitsidySDK.getCallbackContent(encryptedData);
    } catch (error) {
        console.error('Error decrypting data:', error);
        res.status(500).send('Error decrypting data');
        return;
    }

    const transactionId = decryptedData.transactionId;
    const orderId = decryptedData.orderId;
    const invoiceAmount = decryptedData.invoiceAmount;
    const invoiceAmountUsd = decryptedData.invoiceAmountUsd;
    const status = decryptedData.status;
    const payload = decryptedData.payload;
    const customString = decryptedData.customString;
    const receivedAmount = decryptedData.receivedAmount;

    console.log('Transaction ID:', transactionId); // A unique identifier for the transaction.
    console.log('Order ID:', orderId); // Your local order ID that you passed to the invoice creation method. Null if was not passed.
    console.log('Invoice Amount:', invoiceAmount); // The amount of the created invoice in the specified cryptocurrency.
    console.log('Invoice Amount USD:', invoiceAmountUsd); // The amount of the created invoice in USD.
    console.log('Status:', status); // Current status of the invoice. List of all statuses available here.
    console.log('Payload:', payload); // A field for additional information, if any. Usually the same as status.
    console.log('Custom String:', customString); // The custom string you passed to the invoice creation method. Null if was not passed.
    console.log('Received Amount:', receivedAmount); // The amount received for the invoice in the specified cryptocurrency so far.

    res.status(200).send();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});