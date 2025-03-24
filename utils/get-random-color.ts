export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateUniqueColors(numColors: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor((360 * i) / numColors);
    colors.push(`hsl(${hue}, 50%, 50%)`);
  }
  return colors;
}
