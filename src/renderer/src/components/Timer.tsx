import {
  CaretRightOutlined,
  ExportOutlined,
  PauseOutlined,
  RollbackOutlined
} from '@ant-design/icons'
import { openWidget } from '@renderer/helpers/widget'
import { useTimer } from '@renderer/hooks/useTimer'
import { Button, Card, Flex, Progress, Tooltip } from 'antd'
import { useState } from 'react'
import { Timer as TimerType, useTimerContextMenuStore, useTimerModalStore } from '../store'
import TimerContextMenu from './TimerContextMenu'

export type TimerProps = {
  timer: TimerType
  onChange?: (props: TimerType) => void
  onDelete?: (props: TimerType) => void
  onTimeOut: () => void
}

export const Timer = (props: TimerProps) => {
  const [contextMenuCoords, setContextMenuCoords] = useState({ x: 0, y: 0 })
  const timerModalOpen = useTimerModalStore((state) => state.open)
  const setTimerModalContextId = useTimerContextMenuStore((state) => state.setOpenId)
  const timerModalContextId = useTimerContextMenuStore((state) => state.openId)
  const { timeLeft, setTimeLeft, isRunning, setIsRunning, play, setPlay, timerInfo } =
    useTimer(props)

  return (
    <>
      <Card
        hoverable
        className="timer"
        title={props.timer.title}
        extra={
          <div style={{ marginRight: '-16px' }}>
            <Button
              type="text"
              shape="circle"
              icon={<ExportOutlined />}
              onClick={() => {
                setPlay(false)
                openWidget({
                  timer: props.timer,
                  timeLeft,
                  transitionDate: new Date().toISOString(),
                  play
                })
              }}
            />
          </div>
        }
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
          setContextMenuCoords({
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
      <TimerContextMenu
        {...contextMenuCoords}
        visible={props.timer.id === timerModalContextId}
        isRunning={isRunning}
        onClick={(event) => {
          setContextMenuCoords({ x: 0, y: 0 })
          setTimerModalContextId(null)

          if (event.key === 'edit') {
            timerModalOpen(props.timer)
          } else if (event.key === 'delete') {
            props.onDelete?.(props.timer)
          }
        }}
        onClose={() => {
          setTimerModalContextId(null)
          setContextMenuCoords({ x: 0, y: 0 })
        }}
      />
    </>
  )
}
