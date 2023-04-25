import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login-form.feature');

let page: puppeteer.Page;
let inruptPage: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not logged in the site', ({given,when,then}) => {
    
    let username:string;
    let password:string;

    given('An unlogged user', () => {
      username = "prueba-lomapes3b"
      password = "123456789aB#"
    });

    when('I fill the button of Login and redirect to inrupt and fullfill the form and press submit', async () => {
      await expect(page).toClick('button', {text:'Login'})

      await expect(page).toFillForm('form[class="login-up-form"]',{
        username: username,
        password: password
      })
      /*
        await expect(page).toFillForm('form[name="register"]', {
        username: username,
        email: email,
      })
      */
      await expect(page).toClick('button', { text: 'Log In' })
    });

    then('The session isLoggedIn is true', async () => {
      
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

