'use-client'

import React from 'react'

export interface SwtichProps {
  label: string
  onChange?: (on: boolean) => void
}

export default function Switch({ label, onChange }: SwtichProps) {
  return (
    <div className="switch-wrapper">
      <label className="switch">
        <input type="checkbox" onChange={(event) => onChange?.(event.target.checked)} />
        <span className="slider round"></span>
      </label>
      <span>
        {label}
      </span>
    </div>
  )
}