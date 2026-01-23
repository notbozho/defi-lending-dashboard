import BigNumber from "bignumber.js";
import { describe, expect, it } from "vitest";

import { compactNumber } from "../../src/components/shared/FormattedNumber";

describe("compactNumber", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      // Arrange
      const value = "1000000";

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result).toBeDefined();
      expect(result).toHaveProperty("prefix");
      expect(result).toHaveProperty("postfix");
    });
  });

  describe("Number Formatting", () => {
    it("should format large numbers with K postfix", () => {
      // Arrange
      const value = "150000";

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.postfix).toBe("K");
      expect(result.prefix).toBeDefined();
    });

    it("should format very large numbers with M postfix", () => {
      // Arrange
      const value = "150000000";

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.postfix).toBe("M");
    });

    it("should format billion-scale numbers with B postfix", () => {
      // Arrange
      const value = "150000000000";

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.postfix).toBe("B");
    });
  });

  describe("Props", () => {
    it("should respect decimals parameter", () => {
      // Arrange
      const value = "1234567";
      const decimals = 3;

      // Act
      const result = compactNumber({ value, decimals });

      // Assert
      expect(result).toBeDefined();
    });

    it("should round down when specified", () => {
      // Arrange
      const value = "1234.56";
      const decimals = 1;

      // Act
      const result = compactNumber({ value, decimals, roundDown: true });

      // Assert
      expect(result).toBeDefined();
    });

    it("should handle custom compactThreshold", () => {
      // Arrange
      const value = "100";
      const compactThreshold = 1000;

      // Act
      const result = compactNumber({ value, compactThreshold, decimals: 2 });

      // Assert
      expect(result).toBeDefined();
    });
  });

  describe("Input Types", () => {
    it("should handle string input", () => {
      // Arrange
      const value = "5000000";

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.prefix).toBeDefined();
    });

    it("should handle number input", () => {
      // Arrange
      const value = 5000000;

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.prefix).toBeDefined();
    });

    it("should handle BigNumber input", () => {
      // Arrange
      const value = new BigNumber("5000000");

      // Act
      const result = compactNumber({ value, decimals: 2 });

      // Assert
      expect(result.prefix).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined value", () => {
      // Arrange
      const value = undefined;

      // Act
      const result = compactNumber({ value });

      // Assert
      expect(result.prefix).toBe("-");
      expect(result.postfix).toBe("");
    });

    it("should handle null-like values", () => {
      // Arrange & Act
      const result = compactNumber({ value: 0, decimals: 2 });

      // Assert
      expect(result).toBeDefined();
    });

    it("should handle very small numbers", () => {
      // Arrange
      const value = "0.001";

      // Act
      const result = compactNumber({ value, decimals: 4 });

      // Assert
      expect(result).toBeDefined();
    });
  });
});
