import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";
import { MapType } from '../../src/shared/shareddtypes';

const feature = loadFeature('./features/create-marker.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

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
            .catch((err) => { console.log(err) });
    });

    test('The user is logged and add a new Marker', ({ given, when, then }) => {

        let username: string;
        let password: string;

        let marker:MapType;

        given('A logged user', () => {
            username = "prueba-lomapes3b"
            password = "123456789aB#"
        });

        when('I fill the button of Login and redirect to inrupt and fullfill the form and press submit', async () => {

            //Esperamos hasta que aparezca el boton de Log In
            await expect(page).toMatchElement('button', { text: 'Log In' });
            await expect(page).toClick('button', { text: 'Log In' });

            //Esperamos a que aparezca el modal de inicio de sesion
            await expect(page).toMatchElement('button', { text: 'Login with Inrupt' });
            await expect(page).toClick('button', { text: 'Login with Inrupt' });

            //Rellenamos el formulario de inicio de sesion de inrupt y le damos a log in
            let userInput = await page.waitForSelector('input[name="username"]');
            await userInput?.type(username);

            let passInput = await page.waitForSelector('input[name="password"]');
            await passInput?.type(password);

            await expect(page).toClick('button', { text: 'Log In' });
        });

        then('The user is logged in and then he log out', async () => {

            await delay(5000);

            //Esperamos a que se inicie sesion y que se cambie el boton al de Log Out
            await expect(page).toMatchElement('button', { text: 'Log Out' });
            await expect(page).toClick('button', { text: 'Log Out' });

            //Esperamos a que se desconecte del POD
            await expect(page).toMatchElement('button', { text: 'Log In' });

        });
    })

    afterAll(async () => {
        browser.close()
    })

});