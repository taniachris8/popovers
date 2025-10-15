import puppeteer from "puppeteer";
jest.setTimeout(30000);

describe("Tooltip", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();

    await page.goto("http://localhost:9000/");
    await page.waitForSelector(".btn");
    await page.click(".btn");
  });

  afterAll(async () => {
    await browser.close();
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
