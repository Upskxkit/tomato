import { useEffect, useRef, useState } from 'react'
import { Button, Card, Tooltip, Flex } from 'antd'
import { Progress } from 'antd'
import { CaretRightOutlined, RollbackOutlined, PauseOutlined } from '@ant-design/icons'

import TimerPopup from './TimerMenu'
import { useTimerModalStore, Timer as TimerType, useTimerContextMenuStore } from '../store'
import { formatTime } from '../helpers/timer'

export type TimerProps = {
  timer: TimerType
  onChange?: (props: TimerType) => void
  onDelete?: (props: TimerType) => void
  onTimeOut?: () => void
}

export const Timer = (props: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(props.timer.time_in_sec)
  const [timerInfo, setTimerInfo] = useState({
    percent: 100,
    time: formatTime(props.timer.time_in_sec)
  })
  const [isRunning, setIsRunning] = useState(false)
  const [play, setPlay] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)
  const [popup, setPopup] = useState({ x: 0, y: 0 })

  const timerModalOpen = useTimerModalStore((state) => state.open)
  const setTimerModalContextId = useTimerContextMenuStore((state) => state.setOpenId)
  const timerModalContextId = useTimerContextMenuStore((state) => state.openId)

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
      props.onTimeOut?.()
    }
  }, [timeLeft, props.timer.time_in_sec])

  useEffect(() => {
    setTimeLeft(props.timer.time_in_sec)
  }, [props.timer.time_in_sec])

  return (
    <>
      <Card
        hoverable
        className="timer"
        title={props.timer.title}
        extra={<a href="#">More</a>}
        actions={[
          <Tooltip key="btn-search" title="search">
            <Button
              type="primary"
              shape="circle"
              icon={play ? <PauseOutlined /> : <CaretRightOutlined />}
              onClick={() => {
                if (!timeLeft) {
                  setTimeLeft(props.timer.time_in_sec)
                }
                setIsRunning(true)
                setPlay((prev) => !prev)
              }}
            />
          </Tooltip>,
          <Tooltip key="btn-reset" title="reset">
            <Button
              disabled={!isRunning}
              type="primary"
              shape="circle"
              icon={<RollbackOutlined />}
              onClick={() => {
                setIsRunning(false)
                setPlay(false)
                setTimeLeft(props.timer.time_in_sec)
              }}
            />
          </Tooltip>
        ]}
        onContextMenu={(event) => {
          event.preventDefault()
          setTimerModalContextId(props.timer.id ?? null)
          setPopup({
            x: event.clientX,
            y: event.clientY
          })
        }}
      >
        <Flex align="center" justify="center">
          <Progress
            type="circle"
            percent={timerInfo.percent}
            status="normal"
            format={() => timerInfo.time}
            size={200}
          />
        </Flex>
      </Card>
      <TimerPopup
        {...popup}
        visible={props.timer.id === timerModalContextId}
        isRunning={isRunning}
        onClick={(event) => {
          setPopup({ x: 0, y: 0 })
          setTimerModalContextId(null)

          if (event.key === 'edit') {
            timerModalOpen(props.timer)
          } else if (event.key === 'delete') {
            props.onDelete?.(props.timer)
          }
        }}
        onClose={() => {
          setTimerModalContextId(null)
          setPopup({ x: 0, y: 0 })
        }}
      />
    </>
  )
}
