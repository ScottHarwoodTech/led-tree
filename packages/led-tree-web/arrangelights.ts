const k = 6;

const arrangement: Array<{x: number; y: number}> = [];

const voffset = Math.floor(100 / (k + 2));
const baseVoffset = 10;
const xPad = 5;

const colSpacing = Math.floor((100 - 2 * xPad) / (2 * k));

for (let row = 0; row <= k; row += 1) {
  const y = baseVoffset + row * voffset;

  const colCount = 1 + 2 * (k - row);

  const offset = xPad + row * colSpacing;
  for (let col = 0; col < colCount; col += 1) {
    arrangement.push({
      y: y,
      x: offset + col * colSpacing,
    });
  }
}

console.log(arrangement);
