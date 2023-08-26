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
  },  [])
  
  useEffect(() => toggle(open), [open, toggle])

  useEffect(() => {
    modalContent.current?.addEventListener('click', (event) => event.stopPropagation())
    modalClose.current?.addEventListener('click', () => close())
    modal.current?.addEventListener('click', () => close())
  }, [])

  return (
    <div className="modal" tabIndex={-1} role="dialog" ref={modal}>
      <div className="modal-content" ref={modalContent}>
          <div className="modal-header">
            <div className="data-titles">
              <h2 className="data-title">
                {step?.title}
              </h2>
              <h3 className="data-subtitle">
                {step?.subtitle}
              </h3>
            </div>
            <button className="modal-close" type="button" ref={modalClose}>
              <img className="modal-close__icon" src="/icons/default/close.png" alt="Cerrar" />
            </button>
          </div>
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
      </div>
    </div>
  )
}