## Node ESCPOS Printer Server
Handle Printer Queue use Raspberry Pi as printer server.

### On Windows

#### Download Zadig 
- On Windows, Use [Zadig](https://zadig.akeo.ie/) to install the WinUSB driver for your USB device, Otherwise you will get `LIBUSB_ERROR_NOT_SUPPORTED` when attempting to open devices.

##### Using Zadig
- Open Zadig
- Klik Option
 - Show All Device
- Select Your Device
- Klik Reinstall WCID Driver
- ![zadig](https://zadig.akeo.ie/pics/zadig.png "Zadig Img")


##### On JS File

- USB(vid, pid)
```js
const escpos = require('escpos')
escpos.USB = require('escpos-usb')
const usbDevice = new escpos.USB(0x01, 0xff)
```

#### Installing Choco And Setup Valet

* Notes, Everytime you execute power shell command and not found, just close and start new window power shell

Install Choco
- Run Power Shell As Admin
- type
```ps1 
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
 ```
```ps1
.\install.ps1 -RunAsAdmin
```

Install PHP
- choco install php

Install Composer
- download : https://getcomposer.org/Composer-Setup.exe

Install Valet Windows
- `composer global require cretueusebiu/valet-windows`
- `valet install`
- set your network dns to 127.0.0.1 for ipv4 and ::1 for ipv6

Create Proxy to Escpos Printer Server
- `valet proxy printer-server http://localhost:3000`

Setup Printer Server
Change Printer server url to : https://printer-server.test

#### Create Schedule For Refresh Certificate
- create file C:\tools\refresh-certificate.ps1
- insert ```valet proxy printer-server http://localhost:3000``` to refresh-certificate.ps1 file
- save

- open Windows Task Scheduler
- create new schedule
    - check hig
    - Action : Start a program
    - Program : %SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe
    - Arguments : -WindowStyle hidden -ExecutionPolicy Bypass -File C:\tools\refresh-certificate.ps1
    - Triggers :
        - on log on
        - delay 5 minutes
    - set task priority to highest / realtime

