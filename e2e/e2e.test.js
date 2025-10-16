import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Tooltip", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  beforeEach(async () => {
    await page.goto(baseUrl);
    await page.waitForSelector(".btn");
    await page.click(".btn");
  });

  test("should add class 'active' to tooltip if button click", async () => {
    const hasActiveClass = await page.$eval(".tooltip", (el) =>
      el.classList.contains("active"),
    );

    expect(hasActiveClass).toBe(true);
  });

  test("should remove class 'active' if button clicked again", async () => {
    await page.click(".btn");

    const hasActiveClass = await page.$eval(".tooltip", (el) =>
      el.classList.contains("active"),
    );

    expect(hasActiveClass).toBe(false);
  });

  test("should remove class 'active' on blur", async () => {
    await page.$eval(".btn", (el) => el.blur());

    const hasActiveClass = await page.$eval(".tooltip", (el) =>
      el.classList.contains("active"),
    );

    expect(hasActiveClass).toBe(false);
  });
});
