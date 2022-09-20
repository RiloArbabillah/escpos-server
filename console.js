const escpos = require('escpos');
const fs = require("fs");
const device = new escpos.Console((data) => {
    console.log('before', data);
    fs.writeFileSync("./printer.bin", data, { encoding: "binary" })
  const bit = 8;
  for(var i=0;i < data.length;i+= bit){
    var arr = [];
    for(var j=0;j<bit && i+j<data.length;j++) 
      arr.push(data[i + j]);
    arr = arr.map(function(b){
      return b.toString(16).toUpperCase()
    }).map(function(b){
      if(b.length == 1) b = '0' + b;
      return b;
    })
    
    console.log(arr.join(' '));
  }
  console.log();
});
const printer = new escpos.Printer(device);

device.open(error => {
    printer
        .hardware('init')
        .font('A')
        .align('CT')
        .text('Hello from console')
        .cut()
        .close()
})


// var bufStr = '\x1B@Hello World!\n\x1DVA\x03';
// var buf = Buffer.from(bufStr, 'utf8');

// console.log(buf)
