import { test, expect } from "@playwright/test";
import { PASSWORD_MOCK, USERNAME_MOCK } from "./mocks";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test.describe('Login', () => {

    test.describe('api', () => {
        test('should POST /auth/login with success', async ({ request }) => {
            const response = await request.post('https://dummyjson.com/auth/login', {
                data:
                {
                    "username": USERNAME_MOCK,
                    "password": PASSWORD_MOCK
                }
            });
            expect(response.ok()).toBeTruthy();
            const body = await response.json();
            expect(body).toHaveProperty('accessToken')
        })

        test('should request the user login correctly', async ({ page }) => {
            const responsePromise = page.waitForResponse(response =>
                response.url().includes('/auth/login') && response.status() === 200
            );
            const selectors = {
                emailInput: () => page.getByPlaceholder('E-mail'),
                passwordInput: () => page.getByPlaceholder('Senha'),
            };

            await test.step('Fill credentials', async () => {
                await selectors.emailInput().fill(USERNAME_MOCK);
                await selectors.passwordInput().fill(PASSWORD_MOCK);
            });
            await page.getByRole('button', { name: 'Entrar' }).click()

            const response = await responsePromise;
            expect(response.ok()).toBeTruthy();
        });
    })

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