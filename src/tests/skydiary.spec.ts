
import { test, expect } from '@playwright/test'

test.describe('SkyDiary application', () => {
    test('opens the home page', async ({ page }) => {
        await page.goto('/')

        await expect(page.locator('body')).toBeVisible()
    })

    test('displays the trips page', async ({ page }) => {
        await page.goto('/trips')

        await expect(
            page.getByRole('button', { name: /add trip/i }).first()
        ).toBeVisible()
    })

    test('shows the trip list', async ({ page }) => {
        await page.goto('/trips')

        await expect(page.locator('.trip-list')).toBeVisible()
    })

    test('filters trips by destination', async ({ page }) => {
        await page.goto('/trips')

        await page.getByPlaceholder('Search destination...').fill('Tokyo')

        await expect(
            page.locator('.trip-card h2', { hasText: 'Tokyo' })
        ).toBeVisible()

        await expect(
            page.locator('.trip-card h2', { hasText: 'Buenos Aires' })
        ).toHaveCount(0)
    })

    test('shows the favourites page', async ({ page }) => {
        await page.goto('/favourites')

        await expect(page.locator('body')).toBeVisible()
    })

    test('shows the trash page', async ({ page }) => {
        await page.goto('/trash')

        await expect(page.locator('body')).toBeVisible()
    })

    test('shows a message when a trip does not exist', async ({ page }) => {
        await page.goto('/trips/non-existent-trip')

        await expect(page.getByText('Trip not found.')).toBeVisible()
    })

    test('validates required trip form fields', async ({ page }) => {
        await page.goto('/trips/new')

        const submitButton = page.getByRole('button', {
            name: /add trip/i,
        })

        await submitButton.click()

        await expect(page).toHaveURL(/\/trips\/new$/)

        const requiredInputs = page.locator('form input[required]')

        await expect(requiredInputs.first()).toBeVisible()
        await expect(requiredInputs.first()).toHaveJSProperty('validity.valid', false)
    })

    test('creates a new trip', async ({ page }) => {
        await page.goto('/trips/new')

        const inputs = page.locator('form input')

        await inputs.nth(0).fill('2026-11-01')
        await inputs.nth(1).fill('AMS')
        await inputs.nth(2).fill('LIS')
        await inputs.nth(3).fill('SD101')
        await inputs.nth(4).fill('Airbus A320')

        await inputs.nth(5).fill('2026-11-05')
        await inputs.nth(6).fill('LIS')
        await inputs.nth(7).fill('AMS')
        await inputs.nth(8).fill('SD102')
        await inputs.nth(9).fill('Airbus A320')

        await page.getByRole('button', { name: /add trip/i }).last().click()

        await expect(page).toHaveURL(/\/trips$/)

        await expect(
            page.locator('.trip-card h2').getByText('LIS', { exact: true })
        ).toBeVisible()
    })

})
