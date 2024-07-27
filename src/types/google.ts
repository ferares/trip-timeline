export type Coordinates = { lat: number, lng: number } 

export type Place = {
  id: string,
  types: string[],
  displayName: { text: string, languageCode: string }
}

export type AddressComponents = {
  long_name: string,
  short_name: string,
  types: string[]
}[]