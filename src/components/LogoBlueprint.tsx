/**
 * Construction drawing of the CTRL+R mark: the two letterforms plus the dashed guide lines they are
 * built on (traced from the brand's logo construction artwork, 1920×1080 canvas).
 */

const LEFT = "541,216 718,216 898,530 668,530 640,557 640,676 668,704 1000,704 1092,866 598,866 478,744 478,490 602,367 630,367";
const RIGHT = "831,216 1323,216 1446,340 1446,592 1323,714 1295,714 1380,866 1206,866 1025,552 1256,552 1284,525 1284,406 1256,378 922,378";

/** Slope of the mark's slanted strokes (about 60°): x moves 0.573 for every 1 down. */
const SLANT = 180 / 314;

/** Long line through (x, y) along the slant, from the top of the canvas to the bottom. */
function slant(x: number, y: number) {
  return { x1: x - y * SLANT, y1: 0, x2: x + (1080 - y) * SLANT, y2: 1080 };
}

/** Line through (x, y) at 45°, `len` px each way; `dir` 1 runs down-right, -1 runs up-right. */
function diag(x: number, y: number, len: number, dir: 1 | -1) {
  return { x1: x - len, y1: y - len * dir, x2: x + len, y2: y + len * dir };
}

const guides = [
  // Horizontal rows the letterforms sit on.
  { x1: 236, y1: 216, x2: 1590, y2: 216 },
  { x1: 0, y1: 367, x2: 1700, y2: 367 },
  { x1: 340, y1: 378, x2: 1700, y2: 378 },
  { x1: 330, y1: 530, x2: 1680, y2: 530 },
  { x1: 200, y1: 552, x2: 1550, y2: 552 },
  { x1: 236, y1: 704, x2: 1590, y2: 704 },
  { x1: 430, y1: 714, x2: 1780, y2: 714 },
  { x1: 170, y1: 866, x2: 1520, y2: 866 },
  // Vertical stems.
  { x1: 478, y1: 365, x2: 478, y2: 890 },
  { x1: 640, y1: 340, x2: 640, y2: 880 },
  { x1: 1284, y1: 205, x2: 1284, y2: 720 },
  { x1: 1446, y1: 205, x2: 1446, y2: 730 },
  // The slanted strokes, extended across the canvas.
  slant(541, 216),
  slant(718, 216),
  slant(831, 216),
  slant(1025, 552),
  slant(1206, 866),
  slant(1295, 714),
  // 45° chamfers, extended.
  diag(540, 428, 230, -1),
  diag(538, 805, 230, 1),
  diag(1385, 278, 230, 1),
  diag(1385, 653, 230, -1),
  diag(654, 543, 300, -1),
  diag(654, 690, 300, 1),
  diag(1270, 392, 300, 1),
  diag(1270, 538, 300, -1),
];

export function LogoBlueprint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1920 1080" className={className} fill="none" aria-hidden>
      <g stroke="#c90007" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {guides.map((g, i) => (
          <line key={i} {...g} strokeDasharray="6 7" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
        ))}
        <polygon points={LEFT} fill="rgba(201,0,7,0.06)" strokeOpacity="0.9" vectorEffect="non-scaling-stroke" />
        <polygon points={RIGHT} fill="rgba(201,0,7,0.06)" strokeOpacity="0.9" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
