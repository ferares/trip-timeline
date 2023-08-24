'use client'

import { useEffect, useRef, useState } from 'react'

import { Step, Trip } from '@prisma/client'

import { dateHasPassed, dateToString } from '@/utils'
import Modal from './modal'

export default function Timeline({ trip, items, currentId }: { trip: Trip ,items: Step[], currentId: number }) {
  const [modal, setModal] = useState<{ show: boolean, step: Step | undefined }>({ show: false, step: undefined })
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

  function openModal(item: Step) {
    setModal({ show: true, step: item })
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
        {items.map((item, index) => (
          <li key={index} className={`timeline__item timeline__item--${item.type} ${currentId === item.id ? 'active' : ''}`} js-timeline-item="">
            <button className="timeline__item__btn" type="button" onClick={() => openModal(item)}>
              <img className={`timeline__item__icon timeline__item__icon--${item.icon}`} src={`/icons/${item.icon}.png`} alt="" />
              {(currentId === item.id) && usElement}
            </button>
            <h2 className="timeline__item__title">
              {item.title}
            </h2>
            {(item.type !== 'origin' && !dateHasPassed(item.time)) ? (
              <>
                <span className="timeline__item__time">
                  {dateToString(item.time)}
                </span>
                {(items[index + 1]) ? (
                  <>
                    <br />
                    <span className="timeline__item__time">
                      {dateToString(items[index + 1].time)}
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
      <Modal show={modal.show} step={modal.step} close={closeModal} />
    </div>
  )
}