'use client'

import { useCallback, useEffect, useRef } from 'react'

import { Step } from '@prisma/client'

export default function Modal({ step, open, close }: { step?: Step, open: boolean, close: () => void }) {
  const modal = useRef<HTMLDivElement>(null)
  const modalContent = useRef<HTMLDivElement>(null)
  const modalClose = useRef<HTMLButtonElement>(null)

  const toggle = useCallback((show: boolean) => {
    function closeOnEsc (event: KeyboardEvent) {
      if (event.key === 'Escape') close()
    }

    if (show) {
      document.body.style.overflowY = 'hidden'
      document.addEventListener('keydown', closeOnEsc)
      modal.current?.classList.add('show')
    } else {
      document.body.style.overflowY = 'auto'
      document.removeEventListener('keydown', closeOnEsc)
      modal.current?.classList.remove('show')
    }
  }, [close])
  
  useEffect(() => toggle(open), [open, toggle])

  modalContent.current?.addEventListener('click', (event) => event.stopPropagation())
  modalClose.current?.addEventListener('click', () => close())
  modal.current?.addEventListener('click', () => close())

  return (
    <div className="modal" tabIndex={-1} role="dialog" ref={modal}>
      <div className="modal-content" ref={modalContent}>
          <div className="modal-header">
            <button className="modal-close" type="button" ref={modalClose}>X</button>
          </div>
          {step && (
            <div className="modal-body">
              <h2 className="data-title">
                {step.link ? (
                  <a className="data-link" href="{step.link}">
                    {step.title}
                  </a>
                ): step.title}
              </h2>
              {step.address && (
                <span className="data-address">
                  <strong>Dirección</strong>:
                  {step.address}
                </span>
              )}
              {step.company && (
                <h3 className="data-company">
                  {step.company + step.number ? ` - ${step.number}`: ''}
                </h3>
              )}
              {step.duration && (
                <span className="data-duration">
                  <strong>Duración</strong>:
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
                  <strong>Costo</strong>:
                  {step.cost}
                </span>
              )}
              {step.map && (
                <div className="data-map" dangerouslySetInnerHTML={{ __html: step.map }}>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  )
}