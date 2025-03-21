export function getMaskedText(text: string, maskChar: string = 'X'): string {
  return maskChar.repeat(text.length);
}