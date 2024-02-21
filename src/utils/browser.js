/*
 * @Description: 
 * @Version: 1.0
 * @Autor: 
 * @Date: 2022-12-04 00:31:44
 * @LastEditors: 赵卓轩
 * @LastEditTime: 2024-02-21 10:49:28
 */
"use strict";
const puppeteer = require("puppeteer-core");
const path = require("path");
const os = require("os");

function getExecutableFilePath() {
  const extraPath = {
    Linux: "linux-982053/chrome-linux/chrome", // linux
    // Darwin: '', // MacOs
    Windows_NT: "chrome-win/chrome.exe", // windows
  }[os.type()];
  return path.join(path.join(__dirname, "../../"), extraPath);
}

async function createBrowser(parmas = {}) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getExecutableFilePath(),
    args: [
      "--disable-dev-shm-usage", // 大量渲染时候写入/tmp而非/dev/shm，防止页面内存溢出崩溃
      "--no-sandbox", // 禁用沙盒
      "--disable-plugins",
      "--disable-setuid-sandbox",
      "--disable-accelerated-2d-canvas",
      // "--disable-gpu",
      "--disable-images",
      // "--single-process",
      "--disable-accelerated-video",
      "--disable-extensions"
    ],
    timeout: 0, // 禁止超时
    ...parmas,
  });
  return browser;
}

module.exports = {
  createBrowser,
  getExecutableFilePath,
};