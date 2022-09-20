const escpos = require('escpos');

const address = '86:67:7A:A7:60:AD';
const channel = 1;
const device = new escpos.Bluetooth(address, channel);

const server = new escpos.Server(device);

device.open(() => {
  server.listen(9100, err => {
    console.log('Your printer is running at', server.address().port);
  });
});
