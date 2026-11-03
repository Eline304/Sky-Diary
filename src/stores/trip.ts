export interface Flight {
  flightNumber: string
  from: string
  to: string
  date: string
  aircraft: string
}

export interface Trip {
  id: string
  destination: string
  outbound: Flight
  return: Flight
  photoIds: string[]
}
