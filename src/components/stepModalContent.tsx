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
          {step.description && (
            <p className="data-description">
              {step.description}
            </p>
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