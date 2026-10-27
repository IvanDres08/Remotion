import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const serif = "'Playfair Display'";
export const sans = "Poppins";

// Local files (from @fontsource) so rendering doesn't depend on Google Fonts.
for (const weight of ["500", "600"]) {
  for (const style of ["normal", "italic"]) {
    loadFont({
      family: "Playfair Display",
      url: staticFile(`fonts/playfair-display-latin-${weight}-${style}.woff2`),
      weight,
      style,
    });
  }
}
for (const weight of ["500", "600"]) {
  loadFont({
    family: sans,
    url: staticFile(`fonts/poppins-latin-${weight}-normal.woff2`),
    weight,
  });
}
