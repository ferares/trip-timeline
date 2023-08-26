'use client'

export default function Theme({ colors }: { colors: string }) {
  const colorsObject: { [key: string]: string } = JSON.parse(colors)
  let styles = ''
  for (const key in colorsObject) {
    if (Object.prototype.hasOwnProperty.call(colorsObject, key)) {
      const color = colorsObject[key]
      styles += `--color-${key}: ${color};`
    }
  }
  return (
    <style jsx global>{`:root {${styles}}`}</style>
  )
}