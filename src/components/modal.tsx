'use client'

import Image from 'next/image'

import { useCallback, useEffect, useRef } from 'react'

import closeImg from '../../public/icons/default/close.png'

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
  },  [close])
  
  useEffect(() => toggle(open), [open, toggle])

  useEffect(() => {
    modalContent.current?.addEventListener('click', (event) => event.stopPropagation())
    modalClose.current?.addEventListener('click', () => close())
    modal.current?.addEventListener('click', () => close())
  }, [close])

  return (
    <div className="modal" tabIndex={-1} role="dialog" ref={modal}>
      <div className="modal-content" ref={modalContent}>
          <div className="modal-header">
            {title && (<div className="modal-title">{title}</div>)}
            <button className="modal-close" type="button" ref={modalClose}>
              <Image className="modal-close__icon" src={closeImg} alt="Cerrar" />
            </button>
          </div>
          {content}
      </div>
    </div>
  )
}