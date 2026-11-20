import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, "../public/images/Me-color.jpg");
const outputPath = path.join(__dirname, "../public/images/Me-nobg.png");

const img = sharp(inputPath);
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const totalPixels = width * height;

// Helper to check if a pixel is background white/near-white
function isBgPixel(x, y) {
  const idx = (y * width + x) * channels;
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  
  // Outer background is virtually pure white (r, g, b > 238)
  return r >= 238 && g >= 238 && b >= 238;
}

// Flood fill queue
const isBg = new Uint8Array(totalPixels); // 1 if connected background, 0 otherwise
const queue = new Int32Array(totalPixels);
let head = 0;
let tail = 0;

// Seed all border pixels that are near-white
for (let x = 0; x < width; x++) {
  if (isBgPixel(x, 0)) {
    const idx = 0 * width + x;
    isBg[idx] = 1;
    queue[tail++] = idx;
  }
  if (isBgPixel(x, height - 1)) {
    const idx = (height - 1) * width + x;
    isBg[idx] = 1;
    queue[tail++] = idx;
  }
}

for (let y = 0; y < height; y++) {
  if (isBgPixel(0, y)) {
    const idx = y * width + 0;
    if (!isBg[idx]) {
      isBg[idx] = 1;
      queue[tail++] = idx;
    }
  }
  if (isBgPixel(width - 1, y)) {
    const idx = y * width + (width - 1);
    if (!isBg[idx]) {
      isBg[idx] = 1;
      queue[tail++] = idx;
    }
  }
}

// 4-way BFS flood fill
while (head < tail) {
  const curr = queue[head++];
  const cx = curr % width;
  const cy = Math.floor(curr / width);

  // Neighbors: left, right, up, down
  const neighbors = [
    [cx - 1, cy],
    [cx + 1, cy],
    [cx, cy - 1],
    [cx, cy + 1]
  ];

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = neighbors[i];
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nIdx = ny * width + nx;
      if (!isBg[nIdx] && isBgPixel(nx, ny)) {
        isBg[nIdx] = 1;
        queue[tail++] = nIdx;
      }
    }
  }
}

// Now create RGBA buffer with smooth anti-aliased edge
const rgba = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const srcIdx = idx * channels;
    const destIdx = idx * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    rgba[destIdx] = r;
    rgba[destIdx + 1] = g;
    rgba[destIdx + 2] = b;

    if (isBg[idx] === 1) {
      // It's connected background
      rgba[destIdx + 3] = 0;
    } else {
      // Check if neighboring any background pixel for anti-aliasing edge
      let hasBgNeighbor = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (isBg[ny * width + nx] === 1) {
              hasBgNeighbor = true;
              break;
            }
          }
        }
        if (hasBgNeighbor) break;
      }

      if (hasBgNeighbor) {
        // Soft edge based on brightness
        const brightness = (r + g + b) / 3;
        if (brightness > 220) {
          const alpha = Math.max(0, Math.min(255, Math.round(((255 - brightness) / 35) * 255)));
          rgba[destIdx + 3] = alpha;
        } else {
          rgba[destIdx + 3] = 255;
        }
      } else {
        // Internal pixel: 100% opaque, protecting eyes, teeth, clothes
        rgba[destIdx + 3] = 255;
      }
    }
  }
}

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(outputPath);

console.log(`✅ Perfect background removal with protected eyes/teeth → ${outputPath}`);
