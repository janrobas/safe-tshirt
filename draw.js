function interpolate(color1, color2, part) {
  const r1 = parseInt(color1.substr(1, 2), 16);
  const g1 = parseInt(color1.substr(3, 2), 16);
  const b1 = parseInt(color1.substr(5, 2), 16);

  const r2 = parseInt(color2.substr(1, 2), 16);
  const g2 = parseInt(color2.substr(3, 2), 16);
  const b2 = parseInt(color2.substr(5, 2), 16);

  part = Math.min(part, 1);
  const r = part * r2 + (1 - part) * r1;
  const g = part * g2 + (1 - part) * g1;
  const b = part * b2 + (1 - part) * b1;

  return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;
}

const purple = "#800080";
const violet = "#8000ff";

const $canvas = document.createElement("canvas");
$canvas.height = 1200;

$canvas.width = $canvas.height;
const ctx = $canvas.getContext("2d");
const center = $canvas.height / 2;

const limit = 2 * Math.PI * 18 - 0.01;
ctx.lineWidth = 9;

let xx, yy;
for (let x = 0; x <= limit; x += 0.1) {
  const part = x / limit;
  ctx.strokeStyle = interpolate(violet, purple, part);

  xx = Math.sin(x) * (10 + x * 3.3) + center;
  yy = Math.cos(x) * (10 + x * 3.3) + center;

  ctx.lineTo(xx, yy);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(xx, yy);
}

ctx.fillStyle = purple;
ctx.font = "23px Arial";
ctx.fillText("Safe.", xx + 6, yy + 8);

ctx.strokeStyle = purple;

for (let x = 0; x <= Math.PI * 2 + 0.1; x += 0.02) {
  ctx.strokeStyle = interpolate(violet, purple, Math.random());
  const howFar = Math.sin(x * 35);
  
  const xx = Math.sin(x) * (520 + 29 * howFar) + center;
  const yy = Math.cos(x) * (520 + 29 * howFar) + center;

  if (x === 0) {
    ctx.moveTo(xx, yy);
  }

  ctx.lineTo(xx, yy);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xx, yy);
}

document.body.append($canvas);
