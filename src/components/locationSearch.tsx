'use client'

import { useEffect, useState } from 'react'

export default function LocationSearch() {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return
    const body = JSON.stringify({ textQuery: value })
    fetch('/api/locations/', { method: 'POST', body }).then(async (response) => {
      const places = await response.json()
      console.log(places)
    })
  }, [value])
  
  return (
    <input className="form-control" type="text" value={value} onChange={(event) => setValue(event.target.value)} />
  )
}