import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Brand type: Bodoni Moda (logo, headlines) + Manrope (text, labels).
export const bodoni = "'Bodoni Moda'";
export const manrope = "Manrope";

for (const style of ["normal", "italic"]) {
  loadFont({
    family: "Bodoni Moda",
    url: staticFile(`fonts/bodoni-moda-latin-600-${style}.woff2`),
    weight: "600",
    style,
  });
}
for (const weight of ["500", "600", "700"]) {
  loadFont({
    family: manrope,
    url: staticFile(`fonts/manrope-latin-${weight}-normal.woff2`),
    weight,
  });
}
