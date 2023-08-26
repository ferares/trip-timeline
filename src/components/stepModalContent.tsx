'use client'

import { Step } from '@prisma/client'

export default function StepModalContent({ step }: { step?: Step }) {
  return (
    <>
      {step && (
        <div className="modal-body">
          {step.link && (
            <span className="data-link">
              <strong>Sitio web</strong>:&nbsp;
              <a href="{step.link}">
                {step.link}
              </a>
            </span>
          )}
          {step.address && (
            <span className="data-address">
              <strong>Dirección</strong>:&nbsp;
              {step.address}
            </span>
          )}
          {step.company && (
            <h3 className="data-company">
              {step.company + (step.number ? ` - ${step.number}`: '')}
            </h3>
          )}
          {step.duration && (
            <span className="data-duration">
              <strong>Duración</strong>:&nbsp;
              {step.duration}
            </span>
          )}
          {step.description && (
            <p className="data-description">
              {step.description}
            </p>
          )}
          {step.cost && (
            <span className="data-cost">
              <strong>Costo</strong>:&nbsp;
              {step.cost}
            </span>
          )}
          {step.map && (
            <div className="data-map" dangerouslySetInnerHTML={{ __html: step.map }}>
            </div>
          )}
        </div>
      )}
    </>
  )
}