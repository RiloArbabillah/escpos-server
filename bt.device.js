const escpos = require('escpos');

console.log('Scanning Bluetooth...');
escpos.Bluetooth.findPrinters().then(devices => {
    console.log(devices);
});