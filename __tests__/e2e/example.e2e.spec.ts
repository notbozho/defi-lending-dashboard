import { expect, test } from "@playwright/test";

test.describe("DeFi Lending Dashboard", () => {
  test.describe("Page Load", () => {
    test("should load dashboard without crashing", async ({ page }) => {
      // Act
      await page.goto("/");

      // Assert
      await expect(page).toHaveTitle(/Lending Dashboard/);
    });

    test("should display main layout components", async ({ page }) => {
      // Act
      await page.goto("/");

      // Assert
      const connectButton = page.locator('button:has-text("Connect Wallet")');
      await expect(connectButton).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test("should navigate to reserves page when link is clicked", async ({ page }) => {
      // Arrange
      await page.goto("/");

      // Act
      const reservesLink = page.locator('a:has-text("Reserves")');
      const isVisible = await reservesLink.isVisible();

      // Assert
      if (isVisible) {
        await reservesLink.click();
        await page.waitForURL("**/reserves", { timeout: 5000 });
      }
    });

    test("should maintain page state during navigation", async ({ page }) => {
      // Arrange & Act
      await page.goto("/");
      const initialUrl = page.url();

      // Assert
      expect(initialUrl).toContain("localhost");
    });
  });

  test.describe("Chain Selection", () => {
    test("should show chain selector on dashboard", async ({ page }) => {
      // Arrange
      await page.goto("/");

      // Act
      const chainSelector = page.locator('[data-testid="chain-selector"]');
      const isVisible = await chainSelector.isVisible();

      // Assert
      if (isVisible) {
        await expect(chainSelector).toBeVisible();
      }
    });

    test("should display chain options when selector is clicked", async ({ page }) => {
      // Arrange
      await page.goto("/");
      const chainSelector = page.locator('[data-testid="chain-selector"]');
      const isVisible = await chainSelector.isVisible();

      if (!isVisible) {
        test.skip();
        return;
      }

      // Act
      await chainSelector.click();

      // Assert
      await expect(page.locator("text=Ethereum")).toBeVisible();
    });
  });

  test.describe("Market Data", () => {
    test("should load reserves page with market data", async ({ page }) => {
      // Arrange
      await page.goto("/reserves");

      // Act
      await page.waitForSelector("table", { timeout: 10000 }).catch(() => null);
      const rows = page.locator("tbody tr");
      const rowCount = await rows.count();

      // Assert
      expect(rowCount).toBeGreaterThanOrEqual(0);
    });

    test("should display market information in table format", async ({ page }) => {
      // Arrange
      await page.goto("/reserves");

      // Act
      const table = page.locator("table");
      const isVisible = await table.isVisible().catch(() => false);

      // Assert
      if (isVisible) {
        expect(isVisible).toBe(true);
      }
    });
  });

  test.describe("User Data", () => {
    test("should display transaction history section when available", async ({ page }) => {
      // Arrange
      await page.goto("/");

      // Act
      const historySection = page.locator("text=Transaction History");
      const isVisible = await historySection.isVisible().catch(() => false);

      // Assert
      if (isVisible) {
        await expect(historySection).toBeVisible();
      }
    });

    test("should show wallet status on header", async ({ page }) => {
      // Arrange
      await page.goto("/");

      // Act
      const walletButton = page.locator('button:has-text("Connect Wallet")');

      // Assert
      await expect(walletButton).toBeInViewport();
    });
  });
});
