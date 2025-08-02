import { test, expect } from "@playwright/test";
import { PASSWORD_MOCK, USERNAME_MOCK } from "./mocks";

async function login(page) {
    await page.goto('http://localhost:3000');
    await page.getByPlaceholder('E-mail').fill(USERNAME_MOCK);
    await page.getByPlaceholder('Senha').fill(PASSWORD_MOCK);
    await page.getByRole('button', { name: 'Entrar' }).click();
}

async function goToRecipeDetails(page) {
    await page.goto('http://localhost:3000/receitas/2');

}

test.beforeEach(async ({ page }) => {
    await login(page)
    await goToRecipeDetails(page)

});

test.describe('Recipes', () => {
    test('should access recipe detail page', async ({ page }) => {
        await expect(page).toHaveURL(/receitas\/2/);
    })
    test('should render the recipe details correctly', async ({ page }) => {
        await expect(page).toHaveURL(/receitas\/2/);

        await expect(page.locator('img')).toBeVisible();
        await expect(page.getByText('Vegetarian Stir-Fry')).toBeVisible()
        await expect(page.getByText('Tempo de preparo: 20 minutos')).toBeVisible()
        await expect(page.getByText('Calorias por porção: 250 kcal')).toBeVisible()
        await expect(page.getByText('Porções: 3')).toBeVisible()
        await expect(page.getByText('Cozinha: Asian')).toBeVisible()
        await expect(page.getByText('Dificuldade: Medium')).toBeVisible()
        await expect(page.getByText('🍽 Ingredientes:')).toBeVisible()

        const ingredients = [
            'Tofu, cubed',
            'Broccoli florets',
            'Carrots, sliced',
            'Bell peppers, sliced',
            'Soy sauce',
            'Ginger, minced',
            'Garlic, minced',
            'Sesame oil',
            'Cooked rice for serving'
        ];

        await expect(page.locator('ul').getByRole('listitem')).toHaveText(ingredients);

        const instructions = [
            'In a wok, heat sesame oil over medium-high heat.',
            'Add minced ginger and garlic, sauté until fragrant.',
            'Add cubed tofu and stir-fry until golden brown.',
            'Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.',
            'Pour soy sauce over the stir-fry and toss to combine.',
            'Serve over cooked rice.'
        ];

        await expect(page.locator('ol').getByRole('listitem')).toHaveText(instructions);
    })
})