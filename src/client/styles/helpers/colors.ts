import { rgba, parseToRgb, darken, lighten, readableColor } from "polished";

import { Colors, GeneratedColors } from "@/client/utils/common.dto";

export function generateShadows(color: string): string[] {
  const { red, green, blue } = parseToRgb(color);
  const shadows = [];
  for (let i = 1; i <= 4; i += 1) {
    shadows.push(rgba(red, green, blue, i / 10));
  }
  return shadows;
}

export function generateColors(colors: Colors & { [key: string]: string }): GeneratedColors {
  const res: Partial<GeneratedColors> & { [key: string]: GeneratedColors["primary"] } = {};
  Object.keys(colors).forEach(k => {
    res[k] = {
      main: colors[k],
      darken: [darken(0.025, colors[k]), darken(0.05, colors[k])],
      lighten: [lighten(0.025, colors[k]), lighten(0.05, colors[k])],
      shadows: generateShadows(colors[k]),
      contrast: readableColor(colors[k])
    };
  });

  return res as GeneratedColors;
}
