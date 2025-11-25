import { type ClassValue, clsx } from "clsx";
import { FastAverageColor } from "fast-average-color";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fac = new FastAverageColor();

export async function getAverageHex(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;

    img.onload = () => {
      const { hex } = fac.getColor(img);
      resolve(hex);
    };

    img.onerror = reject;
  });
}
