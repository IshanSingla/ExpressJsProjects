const puppeteer = require('puppeteer');
const os = require('os');
async function generatePdf({htmlData,resolution }){
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
  
      let page = await browser.newPage();
  
      await page.setContent(htmlData, {
        waitUntil: "networkidle2",
      });
  
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        landscape: resolution == "landscape" ? true : false,
      });
  
      return pdf;
}

function getIPAddress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
  
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
          return alias.address;
      }
    }
    return '0.0.0.0';
  }
module.exports={generatePdf,getIPAddress}