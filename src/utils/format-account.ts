export function addHyphenBeforePenultimateChar(inputString: string): string {
  if (typeof inputString !== 'string' || inputString.length < 2) {
    return inputString
  }

  const penultimateIndex = inputString.length
  const modifiedString =
    inputString.slice(0, penultimateIndex - 1) +
    '-' +
    inputString.slice(penultimateIndex - 1)

  return modifiedString
}
