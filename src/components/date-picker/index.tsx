import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  parse,
  startOfToday,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

import { Controls } from './components/controls'
import { Header } from './components/header'

import { Modal } from './components/modal'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  setStartDate: (day: string) => void
  setEndDate: (day: string) => void
}

export function DatePicker({ open, setOpen, setStartDate, setEndDate }: Props) {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  const currentDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  function previouCurrentMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextCurrentMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const yesterday = subMonths(today, 1)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
  const [lastMonth, setLastMonth] = useState(format(yesterday, 'MMM-yyyy'))

  const firstDayOfLastMonth = parse(lastMonth, 'MMM-yyyy', new Date())
  const lastDays = eachDayOfInterval({
    start: startOfWeek(firstDayOfLastMonth),
    end: endOfWeek(endOfMonth(firstDayOfLastMonth)),
  })

  function previouLastMonth() {
    const firstDayLastMonth = add(firstDayOfLastMonth, { months: -1 })
    setLastMonth(format(firstDayLastMonth, 'MMM-yyyy'))
  }

  function nextLastMonth() {
    const firstDayLastMonth = add(firstDayOfLastMonth, { months: 1 })
    setLastMonth(format(firstDayLastMonth, 'MMM-yyyy'))
  }

  function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
  }

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex w-[800px] gap-14">
        <div className="relative grid w-1/2 grid-cols-1">
          <Controls
            previousMonth={previouLastMonth}
            nextMonth={nextLastMonth}
          />
          <section className="text-center">
            <Header
              title={capitalize(
                format(firstDayOfLastMonth, 'MMMM yyyy', { locale: ptBR }),
              )}
            />
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {lastDays.map((day, dayIdx) => (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => {
                    setStartDate(day.toISOString().split('T')[0])
                    setSelectedStartDate(day)
                  }}
                  className={classNames(
                    isSameMonth(day, firstDayOfLastMonth)
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-50 text-gray-500',
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'relative py-1.5 hover:bg-gray-100 focus:z-10',
                  )}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={classNames(
                      selectedStartDate && isEqual(day, selectedStartDate)
                        ? 'bg-green-400 font-semibold text-white'
                        : '',
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-l-lg',
                    )}
                  >
                    {format(day, 'd')}
                  </time>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="relative grid w-1/2 grid-cols-1">
          <Controls
            previousMonth={previouCurrentMonth}
            nextMonth={nextCurrentMonth}
          />
          <section className="text-center">
            <Header
              title={capitalize(
                format(firstDayCurrentMonth, 'MMMM yyyy', { locale: ptBR }),
              )}
            />
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {currentDays.map((day, dayIdx) => (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => {
                    setEndDate(day.toISOString().split('T')[0])
                    setSelectedDay(day)
                  }}
                  className={classNames(
                    isSameMonth(day, firstDayCurrentMonth)
                      ? 'bg-white text-gray-900'
                      : 'bg-gray-50 text-gray-500',
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'relative py-1.5 hover:bg-gray-100 focus:z-10',
                  )}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={classNames(
                      selectedDay && isEqual(day, selectedDay)
                        ? 'bg-green-400 font-semibold text-white'
                        : '',
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-r-lg',
                    )}
                  >
                    {format(day, 'd')}
                  </time>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  )
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
