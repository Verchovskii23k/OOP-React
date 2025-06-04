import { test, expect } from '@playwright/test';

test('should display rules screen and navigate to registration', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Наборщик/);

  // Проверка экрана правил
  await expect(page.locator('[data-testid="rules-screen"]')).toBeVisible();
  await expect(page.locator('text=Правила игры "Наборщик"')).toBeVisible();
  await expect(page.locator('[data-testid="navigate-to-register-button"]')).toBeVisible();

  // Переход к регистрации
  await page.click('[data-testid="navigate-to-register-button"]');
  await expect(page.locator('[data-testid="registration-screen"]')).toBeVisible();

  // // Ожидание появления полей ввода
  // await expect(page.locator('[data-testid="registration-screen"]')).toBeVisible()
  // await page.fill('[data-testid="player1_input"]', 'Игрок 1')
  await page.locator('[placeholder="Введите имя игрока 1"]').fill('ssdfdsef')
  await page.locator('[placeholder="Введите имя игрока 2"]').fill('ssdf325sef')



  // Начало игры
  await page.click('[data-testid="start-game-button"]');
  await expect(page.locator('[data-testid="game-screen"]')).toBeVisible();

  // Проверка экрана игры
  await expect(page.locator('[data-testid="game-screen"]')).toBeVisible();
  await expect(page.locator('[data-testid="base-word"]')).toBeVisible();
  await expect(page.locator('[data-testid="player1-list-item"]')).toBeVisible();
  await expect(page.locator('[data-testid="player2-list-item"]')).toBeVisible();
  // await expect(page.locator('[data-testid="current-player"]')).toBeVisible();
  // await expect(page.locator('[data-testid="timer"]')).toBeVisible();
  await expect(page.locator('[data-testid="submit-word-button"]')).toBeVisible();
  // await expect(page.locator('[data-testid="word-input"]')).toBeVisible();
  await expect(page.locator('[data-testid="end-turn-button"]')).toBeVisible();

  // Ввод слова и отправка
  await page.fill('[data-testid="word-input"]', 'пор');
  await page.click('[data-testid="submit-word-button"]');

  // Проверка, что слово было добавлено в список слов игрока
  await expect(page.locator('[data-testid="player1-word-0"]')).toContainText('пор');

  // Проверка смены хода
  await page.click('[data-testid="end-turn-button"]');
  await expect(page.locator('[data-testid="current-player"]')).toContainText('Игрок 2');

  // Завершение игры
  await page.click('[data-testid="end-turn-button"]');
  await expect(page.locator('[data-testid="results-screen"]')).toBeVisible();

  // Проверка результатов игры
  await expect(page.locator('[data-testid="results-screen"]')).toContainText('Игрок 1');
  await expect(page.locator('[data-testid="results-screen"]')).toContainText('Игрок 2');

  // Показать рекорды
  await page.click('[data-testid="toggle-records-button"]');
  await expect(page.locator('[data-testid="player-records-list"]')).toBeVisible();

  // Начать новую игру
  await page.click('[data-testid="reset-game-button"]');
  await expect(page.locator('[data-testid="rules-screen"]')).toBeVisible();
});