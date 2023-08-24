'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Step } from '@prisma/client'

export default function Modal({ step, show = false, close }: { step?: Step, show: boolean, close: () => void }) {
  const [display, setDisplay] = useState(show)
  const modal = useRef<HTMLDivElement>(null)
  const modalContent = useRef<HTMLDivElement>(null)
  const modalClose = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setDisplay(show)
  }, [show, setDisplay])

  const hide = useCallback(close, [close]);

  useEffect(() => {
    function closeOnEsc (event: KeyboardEvent) {
      if (event.key === 'Escape') hide()
    }

    if (display) {
      document.body.style.overflowY = 'hidden'
      document.addEventListener('keydown', closeOnEsc)
    } else {
      document.body.style.overflowY = 'auto'
      document.removeEventListener('keydown', closeOnEsc)
    }
  }, [display, hide])

  modalContent.current?.addEventListener('click', (event) => event.stopPropagation())
  modalClose.current?.addEventListener('click', hide)
  modal.current?.addEventListener('click', hide)

  return (
    <div className={`modal ${display ? 'show' : ''}`} tabIndex={-1} role="dialog" ref={modal}>
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
                <div className="data-map">
                  {step.map}
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  )
}