const escpos = require('escpos');

escpos.USB = require('escpos-usb');
const device = new escpos.USB(0x01, 0xff);

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
