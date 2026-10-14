import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontFamily = "Montserrat";

// Local files (from @fontsource/montserrat) so rendering doesn't depend on
// reaching Google Fonts. The latin subset already covers Spanish accents.
for (const weight of ["800", "900"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}
