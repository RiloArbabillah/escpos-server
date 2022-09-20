const escpos = require('escpos');
const device = new escpos.Console();
const printer = new escpos.Printer(device);

device.open(function (error) {
    printer
        .hardware('init')
        .font('A')
        .align('CT')
        .text('Bello')
        .cut()
        .close()

});