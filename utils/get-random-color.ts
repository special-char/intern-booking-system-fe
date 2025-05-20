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

export const territoryColors: Record<string, string> = {
  "east": "rgba(168, 85, 247, 1)",
  "south": "rgba(236, 72, 153, 1)",
  "west": "rgba(8, 145, 178, 1)",
  "north": "rgba(102, 237, 172, 1)",
};