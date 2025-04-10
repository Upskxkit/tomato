import { formatTime } from '@renderer/helpers/timer'
import { Timer } from '@renderer/store'
import { useState, useRef, useEffect, useReducer } from 'react'

const timerActions = {
  start: 'start',
  stop: 'stop',
  reset: 'reset',
  update: 'update'
}

const timerReducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true }
    case 'stop':
      return { ...state, isRunning: false }
    case 'reset':
      return { ...state, timeLeft: props.timer.time_in_sec }
    case 'update':
      return { ...state, timeLeft: action.payload.timeLeft }
    default:
      throw new Error('Unknown action')
  }
}

export const useTimer = (props: { timer: Timer; onTimeOut: () => void }) => {
  const [] = useReducer(timerReducer, { timeLeft: props.timer.time_in_sec })

  const [timeLeft, setTimeLeft] = useState(props.timer.time_in_sec)
  const [timerInfo, setTimerInfo] = useState({
    percent: 100,
    time: formatTime(props.timer.time_in_sec)
  })
  const [isRunning, setIsRunning] = useState(false)
  const [play, setPlay] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (play) {
      timer.current = setInterval(() => {
        setTimeLeft((prev) => (prev < 1 ? 0 : prev - 1))
      }, 1000)
    }

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [play])

  useEffect(() => {
    setTimerInfo({
      percent: Math.floor((timeLeft / props.timer.time_in_sec) * 100),
      time: formatTime(timeLeft)
    })

    if (timer.current && !timeLeft) {
      clearInterval(timer.current)
      setIsRunning(false)
      setPlay(false)
      props.onTimeOut()
    }
  }, [timeLeft, props.timer.time_in_sec])

  useEffect(() => {
    setTimeLeft(props.timer.time_in_sec)
  }, [props.timer.time_in_sec])

  return {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    play,
    setPlay,
    timerInfo,
    setTimerInfo
  } as const
}
