import { test, expect } from "@playwright/test";
import { PASSWORD_MOCK, USERNAME_MOCK } from "./mocks";

async function login(page) {
    await page.goto('http://localhost:3000');
    await page.getByPlaceholder('E-mail').fill(USERNAME_MOCK);
    await page.getByPlaceholder('Senha').fill(PASSWORD_MOCK);
    await page.getByRole('button', { name: 'Entrar' }).click();
}

async function goToProfile(page) {
    await page.goto('http://localhost:3000/perfil');

}

test.beforeEach(async ({ page }) => {
    await login(page)
});

test.describe('Login', () => {

    test.describe('api', () => {
        test('should GET icon/emilys/128 with success', async ({ request }) => {
            const response = await request.get('https://dummyjson.com/icon/emilys/128');

            expect(response.status(), 'Status code should be 200').toBe(200);
            expect(response.ok()).toBeTruthy();

            const contentType = response.headers()['content-type'];
            expect(contentType).toMatch(/^image\//);
        })

        test('should request icon when loading profile page', async ({ page }) => {
            await login(page);
            const responsePromise = page.waitForResponse(response =>
                response.url().includes('/icon/emilys/128') && response.status() === 200
            );
            await goToProfile(page)

            const response = await responsePromise;
            expect(response.ok()).toBeTruthy();
        });

    })

    test('should access profile page', async ({ page }) => {
        await goToProfile(page)
        await expect(page).toHaveURL(/perfil/);
    })

    test('should render profile information correctly', async ({ page }) => {
        await goToProfile(page)
        await expect(page.getByText('Perfil do Usuário')).toBeVisible()
        await expect(page.getByText('Emily Johnson')).toBeVisible()
        await expect(page.getByText('ID: 1')).toBeVisible()
        await expect(page.getByText('Usuário: emilys')).toBeVisible()
        await expect(page.getByText('Email: emily.johnson@x.dummyjson.com')).toBeVisible()
        await expect(page.getByText('Gênero: female')).toBeVisible()
    })

    test('should logout and clear localStorage', async ({ page }) => {
        await goToProfile(page)
        await page.getByRole('button', { name: 'Sair' }).click()
        const token = await page.evaluate(() => {
            return localStorage.getItem('token');
        });
        const user = await page.evaluate(() => {
            return localStorage.getItem('user');
        });
        expect(token).toBeNull();
        expect(user).toBeNull();
    })

})