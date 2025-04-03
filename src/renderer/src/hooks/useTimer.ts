import { formatTime } from '@renderer/helpers/timer'
import { Timer } from '@renderer/store'
import { useState, useRef, useEffect } from 'react'

export const useTimer = (props: { timer: Timer; onTimeOut: () => void }) => {
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
