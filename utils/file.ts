export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}