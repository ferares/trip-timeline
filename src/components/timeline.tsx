'use client'

import { useEffect, useRef, useState } from 'react'

import { Step, Trip } from '@prisma/client'

import { dateHasPassed, dateToString } from '@/utils'

import Modal from './modal'
import StepModalContent from './stepModalContent'

export default function Timeline({ trip, steps, currentId }: { trip: Trip ,steps: Step[], currentId: number }) {
  const [modal, setModal] = useState<{ show: boolean, title?: JSX.Element, content?: JSX.Element }>({ show: false })
  const timeline = useRef<HTMLOListElement>(null)

  const usElement = (
    <div className="us">
      {JSON.parse(trip.travelers).map((traveler: string, index: number) => <img key={index} className="us__img" src={traveler} alt=""/>)}
    </div>
  )

  useEffect(() => {
    const activeTimelineItem = document.querySelector('[js-timeline-item].active')
    activeTimelineItem?.scrollIntoView({ block: 'end', inline: 'center',  behavior: 'smooth' })
  }, [])

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

  function closeModal() {
    setModal({ ...modal, show: false })
  }

  function startScrollTimeline(direction: -1 | 1) {
    const interval = setInterval(() => scrollTimeline(direction))
    document.addEventListener('mouseup', () => clearInterval(interval), { once: true })
  }

  function scrollTimeline(direction: -1 | 1, scrollDistance: number = 200) {
    timeline.current?.scrollBy({ left: direction * scrollDistance, behavior: 'smooth' })
  }
  
  return (
    <div className="section section--timeline">
      <button className="timeline__arrow-btn" type="button" onMouseDown={() => startScrollTimeline(1)}>
        <img className="timeline__arrow-img" src="/icons/default/arrow.png" alt="Avanzar" />
      </button>
      <button className="timeline__arrow-btn timeline__arrow-btn--back" type="button" onMouseDown={() => startScrollTimeline(-1)}>
        <img className="timeline__arrow-img" src="/icons/default/arrow.png" alt="Retroceder"/>
      </button>
      <ol className="timeline" ref={timeline}>
        {steps.map((step, index) => (
          <li key={index} className={`timeline__item timeline__item--${step.type} ${currentId === step.id ? 'active' : ''}`} js-timeline-item="">
            <button className="timeline__item__btn" type="button" onClick={() => openModal(step)}>
              <img className="timeline__item__info" src="/icons/default/info.png" alt="" />
              <img className={`timeline__item__icon timeline__item__icon--${step.icon}`} src={`/icons/${step.icon}.png`} alt="" />
              {(currentId === step.id) && usElement}
            </button>
            <h2 className="timeline__item__title">
              {step.title}
            </h2>
            {(step.type !== 'origin' && !dateHasPassed(step.time)) ? (
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
        ))}
      </ol>
      <Modal open={modal.show} title={modal.title} content={modal.content} close={closeModal} />
    </div>
  )
}