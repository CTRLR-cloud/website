/**
 * CTRL+R logo core palette — use only these for red/neutral on the site:
 * - Primary red: UI accents, CTAs, links-on-dark, glows
 * - Dark red: depth, gradients, shadows, secondary red emphasis
 * - Neutral gray: de-emphasized text, borders, chrome (ensure contrast on black)
 */
export const BRAND_COLORS = {
  primaryRed: "#C90007",
  darkRed: "#690404",
  black: "#000000",
  white: "#FFFFFF",
  neutralGray: "#4D4D4D",
} as const;

/** RGB for `rgba(...)` in inline styles / SVG (primary red #C90007) */
export const BRAND_PRIMARY_RGB = "201,0,7" as const;

/** RGB for darker red #690404 */
export const BRAND_DARK_RED_RGB = "105,4,4" as const;
