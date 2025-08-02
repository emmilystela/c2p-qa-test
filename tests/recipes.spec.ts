import { test, expect } from "@playwright/test";
import { PASSWORD_MOCK, USERNAME_MOCK } from "./mocks";

async function login(page) {
    await page.goto('http://localhost:3000');
    await page.getByPlaceholder('E-mail').fill(USERNAME_MOCK);
    await page.getByPlaceholder('Senha').fill(PASSWORD_MOCK);
    await page.getByRole('button', { name: 'Entrar' }).click();
}

test.beforeEach(async ({ page }) => {
    await login(page)

});

test.describe('Recipes', () => {
    test.describe('api', () => {
        test('should GET /recipes with success', async ({ request }) => {
            const response = await request.get('https://dummyjson.com/recipes');

            expect(response.status(), 'Status code should be 200').toBe(200);
            expect(response.ok()).toBeTruthy();

            const body = await response.json();

            expect(body).toHaveProperty('recipes')
            expect(body).toMatchObject({
                recipes: expect.any(Array),
            });
        })
        test('should request recipes correctly', async ({ page }) => {
            await login(page)
            const responsePromise = page.waitForResponse(response =>
                response.url().includes('/recipes') && response.status() === 200
            );
            await expect(page).toHaveURL(/receitas/)

            const response = await responsePromise;
            expect(response.ok()).toBeTruthy();
        });
    })

    test('should access recipe route', async ({ page }) => {
        await expect(page).toHaveURL(/receitas/)
    })
    test('should render a list of recipes', async ({ page }) => {
        await expect(page).toHaveURL(/receitas/)

        // using css to identify card elements, but it is bad practice, the code needs set testId or other reliable way to identify elements
        const recipeItems = page.locator('[style*="box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px"]')

        await expect(recipeItems.first()).toBeVisible();
        expect(await recipeItems.count()).toBeGreaterThan(0);
        await expect(recipeItems.first()).toBeVisible();
    })

    test('should render the list item correctly', async ({ page }) => {
        await expect(page).toHaveURL(/receitas/)

        // using css to identify card elements, but it is bad practice, the code needs set testId or other reliable way to identify elements
        const recipeItems = page.locator('[style*="box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px"]')
        const count = await recipeItems.count();
        expect(count).toBeGreaterThan(0);


        for (let i = 0; i < count; i++) {
            const item = recipeItems.nth(i);
            await expect(item.locator('img')).toBeVisible();
            await expect(item.locator('#name')).toBeVisible()
            await expect(item.locator('#time')).toBeVisible()
            await expect(item.locator('#calories')).toBeVisible()
            await expect(item.locator('#ingredients')).toBeVisible()
        }

    })

    test('should redirect to item page when click in name', async ({ page }) => {
        await expect(page).toHaveURL(/receitas/)

        // using css to identify card elements, but it is bad practice, the code needs set testId or other reliable way to identify elements
        const firstItem = page.locator('[style*="box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 5px"]').first()

        await firstItem.locator('#name').click();
        await expect(page).toHaveURL(/receitas\/\d+$/);

    })
})