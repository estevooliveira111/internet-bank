export function documentFormat(document: string) {
  if (!document) {
    return ''
  }

  const documentTrim = document.replace(/[/,.,-]/g, '')

  if (documentTrim.length === 11) {
    return documentTrim.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  if (documentTrim.length === 14) {
    return documentTrim.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    )
  }
  return documentTrim
}
