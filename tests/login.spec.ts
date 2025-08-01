import { test, expect } from "@playwright/test";

const USERNAME_MOCK = 'emilys'
const PASSWORD_MOCK = 'emilyspass'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Login', () => {
    test('should render the login page correctly', async ({ page }) => {
        await expect(page).toHaveTitle(/Minhas Receitas/);
        await expect(page.getByText('Minhas Receitas')).toBeVisible();
        await expect(page.getByPlaceholder('E-mail')).toBeVisible();
        await expect(page.getByPlaceholder('Senha')).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Entrar' })
                .first()
        ).toBeVisible();
    })

    test('should show a message error if the login fail', async ({ page }) => {
        await test.step('Fill credentials', async () => {
            await page.getByPlaceholder('E-mail').fill('incorrect_username');
            await page.getByPlaceholder('Senha').fill('incorrect_password');
        });

        await page.getByRole('button', { name: 'Entrar' }).click()
        await expect(page.getByText('E-mail ou senha inválidos.')).toBeVisible();
    })

    test('should login successfully and redirect to first screen', async ({ page }) => {
        const selectors = {
            emailInput: () => page.getByPlaceholder('E-mail'),
            passwordInput: () => page.getByPlaceholder('Senha'),
        };

        await test.step('Fill credentials', async () => {
            await selectors.emailInput().fill(USERNAME_MOCK);
            await selectors.passwordInput().fill(PASSWORD_MOCK);
        });

        await test.step('check inputs', async () => {
            await expect(selectors.emailInput()).toHaveValue(USERNAME_MOCK);
            await expect(selectors.passwordInput()).toHaveValue(PASSWORD_MOCK);
            await expect(selectors.passwordInput().getAttribute('type')).resolves.toBe('password');
        })

        await page.getByRole('button', { name: 'Entrar' }).click()
        await expect(page).toHaveURL(/receitas/)
    })

    test('should save user token in localstorage', async ({ page }) => {
        await test.step('Fill credentials', async () => {
            await page.getByPlaceholder('E-mail').fill(USERNAME_MOCK);
            await page.getByPlaceholder('Senha').fill(PASSWORD_MOCK);
        });
        await page.getByRole('button', { name: 'Entrar' }).click()
        await expect(page).toHaveURL(/receitas/)

        const token = await page.evaluate(() => {
            return localStorage.getItem('token');
        });
        const user = await page.evaluate(() => {
            return localStorage.getItem('user');
        });
        expect(token).not.toBeNull();
        expect(token).toBe(JSON.parse(user as string)?.accessToken);
        expect(user).not.toBeNull();
    })

})