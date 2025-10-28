export function useCopyToClipboard() {
  return async (text: string): Promise<boolean> => {
    if (!text || typeof text !== "string") {
      console.error("Invalid text provided for copying to clipboard.");
      return false;
    }

    if (!navigator.clipboard) {
      console.error("Clipboard API not supported in this browser.");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      return false;
    }
  };
}
