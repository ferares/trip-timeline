'use client'

import { useCallback, useEffect, useRef } from 'react'

export default function Modal({ content, title, open, close }: { content?: JSX.Element, title?: JSX.Element, open: boolean, close: () => void }) {
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
            {title && (<div className="modal-title">{title}</div>)}
            <button className="modal-close" type="button" ref={modalClose}>
              <img className="modal-close__icon" src="/icons/default/close.png" alt="Cerrar" />
            </button>
          </div>
          {content}
      </div>
    </div>
  )
}