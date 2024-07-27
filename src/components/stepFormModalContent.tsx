'use client'

import { Step } from '@prisma/client'

import LocationSearch from './locationSearch'

export default function StepFormModalContent({ step }: { step?: Step }) {
  return (
    <div className="modal-body">
      <LocationSearch />
      <div className="form-group">
        <label className="form-label" htmlFor="icon">Icono</label>
        <input id="icon" className="form-control" type="text" value={step?.icon ?? ''} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="type">Tipo</label>
        <select id="type" className="form-control" value={step?.type ?? ''}>
          <option value="" hidden></option>
          <option value="transit">Transporte</option>
          <option value="scale">Escala</option>
          <option value="stay">Estadía</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="date">Fecha y hora</label>
        <input type="datetime-local" id="date" value={step?.time ?? ''} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="date">Zona horaria</label>
        <input type="number" min={0} max={23} />: <input type="number" min={0} max={59} />
      </div>
    </div>
  )
}