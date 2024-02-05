/*
 * @Description:
 * @Version: 1.0
 * @Autor:
 * @Date: 2022-12-04 00:31:30
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2024-02-05 20:09:43
 */
"use strict";

const { createBrowser } = require("./utils/browser.js");
const { event } = require("./websocket.js");

(async function () {
  const browser = await createBrowser();
  const page = await browser.newPage();
  const requestList = ["https://mcs.zijieapi.com/list"];
  let qrcodeTimer;
  let currentQrCode;
  await page.goto("https://eos.douyin.com/");
  console.log("页面加载成功");


  await page.setRequestInterception(true);
  page.on('request', request => {
      if(requestList.includes(request.url())) {
        console.log(request);
      }
      request.continue();
  });
  page.on('response', response => {
    if(requestList.includes(response.url())) {
      console.log(response);
    }
  });

  await page.on("console", (msg) => {
    const text = msg.text();
    console.log(text);
  });

  qrcodeTimer = setInterval(async () => {
    try {
      const refresh = await page.$(
        ".web-login-scan-code__content__qrcode-wrapper__mask__toast"
      );
      if (refresh) {
        refresh.click();
        console.log("刷新二维码");
      }
    } catch (err) {
      console.error("cannot find refresh button");
    }
    try {
      const qrcode = await page.$eval(
        ".web-login-scan-code__content img",
        (el) => el.src
      );
      if (qrcode !== currentQrCode) {
        currentQrCode = qrcode;
        console.log(qrcode);
      }
    } catch (err) {
      console.error("cannot find qrcode");
    }
  }, 2000);


})();
