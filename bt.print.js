const escpos = require('escpos');
const address = '86:67:7A:A7:60:AD';
// const address = '11:22:33:44:55:66';
const channel = 1;
const device = new escpos.Bluetooth(address, channel);
const printer = new escpos.Printer(device);

device.open(error => {
    printer
        .hardware('init')
        // .font('A')
        // .align('CT')
        // .text('Hello from bluetooth')
        // .cut()
        .raw(`1B 40 1B 4D 00 1B 61 01
48 65 6C 6C 6F 20 66 72
6F 6D 20 63 6F 6E 73 6F
6C 65 0A 0A 0A 0A 1D 56
00`)
        .close()
})
