import { AddressComponents, Coordinates, Place } from './types/google'

declare type PlaceDetailsResult = { address_components: AddressComponents, geometry: { location: Coordinates }, name: string }

declare type TimeZoneResult = { dstOffset: number, rawOffset: number }

// Text Search https://developers.google.com/maps/documentation/places/web-service/text-search
export async function getPlace(textQuery: string) {
  const googleApiKey = process.env.GOOGLE_API_KEY || ''
  const url = 'https://places.googleapis.com/v1/places:searchText'
  const headers = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': googleApiKey,
    'X-Goog-Fieldmask': 'places.displayName,places.types,places.id',
  }
  const body = JSON.stringify({ textQuery, languageCode: 'es', includedType: 'locality' })
  const response = await fetch(url, { method: 'POST', headers, body })
  if ((response.status < 200) || (response.status >= 300)) throw response
  const { places }: { places: Place[] } = await response.json()
  return places.filter((place) => place.types.includes('locality'))
}

// https://developers.google.com/maps/documentation/places/web-service/details
export async function getPlaceDetails(id: string) {
  const googleApiKey = process.env.GOOGLE_API_KEY || ''
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=geometry,address_components,name&key=${googleApiKey}`
  const response = await fetch(url)
  if ((response.status < 200) || (response.status >= 300)) throw response
  const { result }: { result: PlaceDetailsResult } = await response.json()
  const country = result.address_components.find((address) => address.types.includes('country'))?.long_name
  return { country, name: result.name, coordinates: result.geometry.location }
}

// https://developers.google.com/maps/documentation/timezone/get-started
export async function getPlaceTimeZone(coordinates: Coordinates, timestamp: number) {
  const googleApiKey = process.env.GOOGLE_API_KEY || ''
  const location = encodeURIComponent(`${coordinates.lat},${coordinates.lng}`)
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${location}&timestamp=${timestamp}&key=${googleApiKey}`
  const response = await fetch(url)
  const result: TimeZoneResult = await response.json()
}