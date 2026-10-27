const { chromium } = require(process.env.PW);
const fs = require("fs");
const path = require("path");
const [, , fontDir, cssPath, outDir, ...emojis] = process.argv;
(async () => {
  const css = fs.readFileSync(cssPath, "utf8").replace(/url\(\.\/files\/([^)]+)\)/g, (_, f) => `url(file://${path.join(fontDir, f)})`);
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  const page = await browser.newPage({ viewport: { width: 600, height: 600 } });
  for (const e of emojis) {
    const name = [...e].map((c) => c.codePointAt(0).toString(16)).join("-");
    await page.setContent(`<html><head><style>${css} body{margin:0;background:transparent}
      #e{width:512px;height:512px;font-family:'Noto Color Emoji';font-size:400px;line-height:512px;text-align:center}</style></head>
      <body><div id="e">${e}</div></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.locator("#e").screenshot({ path: path.join(outDir, name + ".png"), omitBackground: true });
    console.log(e, name);
  }
  await browser.close();
})();
