import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Poppins";

// Local files (from @fontsource/poppins) so rendering doesn't depend on
// Google Fonts.
for (const weight of ["500", "600", "700"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/poppins-latin-${weight}-normal.woff2`),
    weight,
  });
}
