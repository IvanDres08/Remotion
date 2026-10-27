import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Nunito";

// Local files (from @fontsource) so rendering doesn't depend on Google Fonts.
for (const weight of ["800", "900"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/nunito-latin-${weight}-normal.woff2`),
    weight,
  });
}
