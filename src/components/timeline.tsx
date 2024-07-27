'use client'

import Image from 'next/image'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Step, Trip } from '@prisma/client'

import { dateToString } from '@/utils'

import Modal from './modal'
import StepModalContent from './stepModalContent'
import StepFormModalContent from './stepFormModalContent'

import arrowImg from '../../public/icons/default/arrow.png'
import infoImg from '../../public/icons/default/info.png'
import editImg from '../../public/icons/default/edit.png'
import addImg from '../../public/icons/default/add.png'

export default function Timeline({ trip, steps, currentId, admin = false }: { trip: Trip ,steps: Step[], currentId: number, admin?: boolean }) {
  const [modal, setModal] = useState<{ show: boolean, title?: JSX.Element, content?: JSX.Element }>({ show: false })
  const timeline = useRef<HTMLOListElement>(null)

  const usElement = (
    <div className="us">
      {JSON.parse(trip.travelers).map((traveler: string, index: number) => <Image key={index} className="us__img" src={traveler} width={64} height={64} alt=""/>)}
    </div>
  )

  useEffect(() => {
    const activeTimelineItem = document.querySelector('[js-timeline-item].active')
    activeTimelineItem?.scrollIntoView({ block: 'end', inline: 'center',  behavior: 'smooth' })
  }, [])

  function editModal(step: Step) {
    openFormModal(step)
  }
  
  function addModal(index: number) {
    openFormModal()
  }

  function openFormModal(step?: Step) {
    const content = (<StepFormModalContent step={step} />)
    const title = (<>
      <h2 className="data-title">
        Título: <input type="text" value={step?.title || ''} />
      </h2>
      <h3 className="data-subtitle">
        Subtítulo: <input type="text" value={step?.subtitle || ''} />
      </h3>
    </>)
    setModal({ show: true, content, title })
  }

  function openModal(step: Step) {
    const content = (<StepModalContent step={step} />)
    const title = (<>
      <h2 className="data-title">
        {step?.title}
      </h2>
      <h3 className="data-subtitle">
        {step?.subtitle}
      </h3>
    </>)
    setModal({ show: true, content, title })
  }

  const closeModal = useCallback(() => {
    setModal((modal) => { return { ...modal, show: false } })
  }, [])

  function startScrollTimeline(direction: -1 | 1) {
    const interval = setInterval(() => scrollTimeline(direction))
    document.addEventListener('mouseup', () => clearInterval(interval), { once: true })
  }

  function scrollTimeline(direction: -1 | 1, scrollDistance: number = 200) {
    timeline.current?.scrollBy({ left: direction * scrollDistance, behavior: 'smooth' })
  }

  const timelineItems = []
  for (let index = 0; index < steps.length; index++) {
    const step = steps[index]
    timelineItems.push(
      <li key={index} className={`timeline__item timeline__item--${step.type} ${currentId === step.id ? 'active' : ''}`} js-timeline-item="" title={admin ? 'Editar' : 'Ver más información'}>
        <button className="timeline__item__btn" type="button" onClick={() => admin ? editModal(step) : openModal(step)}>
          <Image className="timeline__item__info" src={admin ? editImg : infoImg} alt="" />
          <Image className={`timeline__item__icon timeline__item__icon--${step.icon}`} height={120} width={120} src={`/icons/${step.icon}.png`} alt="" />
          {(currentId === step.id) && usElement}
        </button>
        <h2 className="timeline__item__title">
          {step.title}
        </h2>
        {(step.type !== 'origin') ? (
          <>
            <span className="timeline__item__time">
              {dateToString(step.time)}
            </span>
            {(steps[index + 1]) ? (
              <>
                <br />
                <span className="timeline__item__time">
                  {dateToString(steps[index + 1].time)}
                </span>
              </>
            ) : (
              <span className="timeline__item__time">
                &nbsp;
              </span>
            )}
          </>
        ) : (
          <>
            <span className="timeline__item__time">
              &nbsp;
            </span>
            <br />
            <span className="timeline__item__time">
              &nbsp;
            </span>
          </>
        )}
      </li>
    )
    if ((admin) && (index < steps.length - 1)) timelineItems.push(
      <li key={`admin-${index}`}>
        <button className="timeline__admin-add" type="button" onClick={() => addModal(index)} title="Agregar paso intermedio">
          <Image className="timeline__admin-add__icon" src={addImg} alt="" />
        </button>
      </li>
    )
  }
  
  return (
    <div className="section section--timeline">
      <button className="timeline__arrow-btn" type="button" onMouseDown={() => startScrollTimeline(1)}>
        <Image className="timeline__arrow-img" src={arrowImg} alt="Avanzar" />
      </button>
      <button className="timeline__arrow-btn timeline__arrow-btn--back" type="button" onMouseDown={() => startScrollTimeline(-1)}>
        <Image className="timeline__arrow-img" src={arrowImg} alt="Retroceder"/>
      </button>
      <ol className="timeline" ref={timeline}>
        {timelineItems}
      </ol>
      <Modal open={modal.show} title={modal.title} content={modal.content} close={closeModal} />
    </div>
  )
}