const crypto = require('crypto');
const axios = require('axios');

class BitsidySDK {
    constructor(apiKey, storeId) {
        this.apiKey = apiKey;
        this.storeId = storeId;
    }

    encryptData(data) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.apiKey), iv);
        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'binary');
        encrypted += cipher.final('binary');
        const ivAndEncryptedData = Buffer.from(iv.toString('binary') + encrypted, 'binary').toString('base64');
        return encodeURIComponent(ivAndEncryptedData);
    }

    decryptData(data) {
        const dataBuffer = Buffer.from(decodeURIComponent(data), 'base64');
        const iv = dataBuffer.slice(0, 16);
        const encryptedText = dataBuffer.slice(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.apiKey), iv);
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    async createInvoice(invoiceData) {
        const requestData = {
            storeId: this.storeId,
            data: this.encryptData(invoiceData)
        };

        try {
            const response = await axios.post('https://api.bitsidy.com/v1/app/invoice/create', requestData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.result !== 'success') {
                console.log(this.decryptData(response.data.data).message);
                return false;
            }

            return this.decryptData(response.data.data);
        } catch (error) {
            console.error('Error creating invoice:', error);
            return false;
        }
    }

    async getCallbackContent(encryptedData) {
        return this.decryptData(encryptedData);
    }
}

module.exports = BitsidySDK;