# Bitsidy JavaScript SDK

Bitsidy SDK is a toolkit for integrating Bitsidy's cryptocurrency invoice services into your JavaScript projects. Whether you are using npm for dependency management or prefer manual inclusion, this SDK is designed for easy integration.

## Project Structure
- `index.js`: The core SDK file.
- `examples/example.js`: An example script demonstrating SDK usage.
- `examples/callback.js`: An example script demonstrating how to handle received callback data.
- `package.json`: npm configuration file.

## Requirements

To use the Bitsidy JavaScript SDK, the following requirements must be met:
- __Node.js:__ Version 10.0.0 or higher.
- __npm:__ For managing dependencies, npm version 6.0.0 or higher is recommended.

To run the `callback.js` example script, which demonstrates handling callback data, the following specific requirements must be met:
- __Express:__ A minimal and flexible Node.js web application framework. Install using npm: `npm install express`.
- __Body-parser:__ Middleware for parsing incoming request bodies. Install using npm: `npm install body-parser`.
- __Network Configuration:__ The script must be reachable from the network sending the callback data, and your firewall settings should allow incoming HTTP requests on the port used by the script (port 3000).

## Installation

### Using npm
To install via npm, run:

```bash
npm install bitsidy-sdk
```

Then, require the SDK in your script:

```js
const BitsidySDK = require('bitsidy-sdk');
```
### Manual Installation
1. Download or clone the Bitsidy SDK repository.
2. Place the SDK folder in your project directory.
3. In your JavaScript file, use require to include the SDK. Assuming the SDK folder is named bitsidy-sdk and it's placed in your project's root directory, the code to include it would be:

```js
const BitsidySDK = require('./bitsidy-sdk');
```

## Usage
Refer to examples/example.js for a practical demonstration on using the Bitsidy SDK to create invoices and handle responses. For understanding how our server communicates invoice status updates, consult examples/callback.js.

## Contributing
Contributions to the Bitsidy SDK are welcome. Please ensure that your code adheres to the project's coding standards and include tests for new features or bug fixes.

## License
This project is licensed under the GPLv3.

For more information and updates, visit the project repository.