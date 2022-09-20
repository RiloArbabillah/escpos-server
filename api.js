const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const portHttp = 3000;
const portHttps = 3443;
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const escpos = require('escpos');

const queueJobPrint = (callback) => {
    const device = new escpos.Network('localhost', 9100);

    const printer = new escpos.Printer(device);

    device.open(() => callback(printer, device))
}

const binaryParser = (plain) => {
    const data = Buffer.from(plain, 'base64')
    const bit = 8;
    let result = [];
    for (var i = 0; i < data.length; i += bit) {
        var arr = [];
        for (var j = 0; j < bit && i + j < data.length; j++)
            arr.push(data[i + j]);
        arr = arr.map(function (b) {
            return b.toString(16).toUpperCase()
        }).map(function (b) {
            if (b.length == 1) b = '0' + b;
            return b;
        })

        result.push(arr.join(' '))
    }

    return result.join(' ');
}

app.use(cors())
app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/test', (req, res) => {
    const message = `This Just Print Test Message`;
    queueJobPrint(printer =>
        printer
            .hardware('init')
            .font('a')
            .text(message)
            .qrimage('https://deka.dev', function(err){
                // this.barcode('123456789012', 'EAN13') // code length 12
                // this.barcode('109876543210') // default type 'EAN13'
                // this.barcode('7654321', 'EAN8') // The EAN parity bit is automatically added.
                this.cut();
                this.close();
            })
    );

    res.send(message);
})

app.post('/print', jsonParser, (req, res) => {
    const { raw } = req.body

    queueJobPrint(printer =>
        printer
            .hardware('init')
            .raw(binaryParser(raw))
            .cut()
            .close()
    )

    res.send({
        raw
    })
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key,
    cert,
    requestCert: false,
    rejectUnauthorized: false
}, app);


httpServer.listen(portHttp, () => {
  console.log("ESCPOS Http server listing on port : " + portHttp)
});

httpsServer.listen(portHttps, () => {
  console.log("ESCPOS Https server listing on port : " + portHttps)
});