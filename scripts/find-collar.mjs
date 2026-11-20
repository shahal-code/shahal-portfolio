import sharp from "sharp";
import fs from "fs";

const img = sharp("public/images/Me-nobg.png");
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

console.log("Analyzing collar and neck points...");
// Scan columns from x = 300 to 700 to find where the collar flap lines are
// In the illustration, there are black outlines (e.g. RGB < 50) around the collar and neck.
for (let x = 320; x <= 700; x += 40) {
  const points = [];
  for (let y = 430; y < 650; y++) {
    const idx = (y * width + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2], a = data[idx+3];
    // Black outline
    if (a > 200 && r < 50 && g < 50 && b < 50) {
      points.push(y);
    }
  }
  console.log(`x=${x} outline y points:`, points);
}
