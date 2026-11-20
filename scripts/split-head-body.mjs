import sharp from "sharp";

const img = sharp("public/images/Me-nobg.png");
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const headBuffer = Buffer.alloc(width * height * 4);
const bodyBuffer = Buffer.alloc(width * height * 4);

// Neck width limits as a function of Y:
// Neck starts under chin around y = 410, runs down to collar around y = 570
// Neck left edge is around x = 405..420
// Neck right edge is around x = 600..615
function isInsideNeck(x, y) {
  if (y < 410) return true; // above chin is head/face/hair
  if (y > 580) return false; // below collar opening is chest/shirt
  // Neck trapezoid widening slightly toward shoulders
  const neckLeft = 410 - (y - 410) * 0.15;
  const neckRight = 605 + (y - 410) * 0.15;
  return x >= neckLeft && x <= neckRight;
}

// Collar front flap check:
// The collar flaps sit on the left (x: 340..430, y: 460..560) and right (x: 580..670, y: 460..560)
// and button placket below y: 550
function isCollarOrShirt(x, y, r, g, b) {
  if (y > 565) return true; // all chest & shirt
  // Check if it's the pink collar fabric or collar outline
  const isPink = (r > 220 && g > 175 && b > 175) || (r > 200 && g > 150 && b > 150 && Math.abs(g - b) < 15);
  // Sides are collar/shoulders
  if (y >= 460 && (x < 420 || x > 600)) {
    return true;
  }
  return false;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const a = data[idx + 3];
    if (a === 0) continue;

    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    const inNeck = isInsideNeck(x, y);
    const inCollar = isCollarOrShirt(x, y, r, g, b);

    // HEAD & NECK LAYER:
    // Takes head, face, hair, and neck down to y=575
    if (inNeck && y <= 580) {
      headBuffer[idx] = r;
      headBuffer[idx + 1] = g;
      headBuffer[idx + 2] = b;
      
      // Feather the bottom edge of neck (y 555..580)
      if (y > 555) {
        const fade = (580 - y) / 25;
        headBuffer[idx + 3] = Math.round(a * fade);
      } else {
        headBuffer[idx + 3] = a;
      }
    }

    // BODY & SHIRT LAYER:
    // Takes shoulders, shirt, and collar (everything from y=455 downwards that is NOT the exposed neck)
    if (y >= 455) {
      // The exposed neck skin inside V-neck (x: 430..570, y < 555) should NOT be on the body
      const isExposedNeckSkin = (x > 425 && x < 585 && y < 555 && !inCollar);
      if (!isExposedNeckSkin) {
        bodyBuffer[idx] = r;
        bodyBuffer[idx + 1] = g;
        bodyBuffer[idx + 2] = b;
        bodyBuffer[idx + 3] = a;
      }
    }
  }
}

await sharp(headBuffer, { raw: { width, height, channels: 4 } })
  .png()
  .toFile("public/images/Me-head.png");

await sharp(bodyBuffer, { raw: { width, height, channels: 4 } })
  .png()
  .toFile("public/images/Me-body.png");

console.log("✅ Separated Me-head.png and Me-body.png successfully!");
