const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 800});
  await page.goto('http://127.0.0.1:8080', {waitUntil: 'networkidle2'});
  await page.screenshot({path: 'screenshot.png', fullPage: true});
  await browser.close();
  console.log("Screenshot taken");
})();
