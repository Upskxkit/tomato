import {
  CaretRightOutlined,
  ImportOutlined,
  PauseOutlined,
  RollbackOutlined,
  CloseOutlined,
  HolderOutlined
} from '@ant-design/icons'
import { useTimer } from '@renderer/hooks/useTimer'
import { Button, Divider, Flex, Space, Tooltip, Typography } from 'antd'
import { TimerProps } from './Timer'
import { UpdatedState, WidgetConfigParams } from '@renderer/helpers/widget'
import { useEffect } from 'react'

const TimerWidget = (
  props: Pick<TimerProps, 'timer' | 'onTimeOut'> & {
    onHide: (props: WidgetConfigParams) => void
    onClose: () => void
    updatedState: UpdatedState | null
  }
) => {
  const { timeLeft, setTimeLeft, isRunning, setIsRunning, play, setPlay, timerInfo, updateState } =
    useTimer(props)

  useEffect(() => {
    if (props.updatedState) {
      updateState(props.updatedState)
    }
  }, [props.updatedState, updateState])

  return (
    <>
      <Flex align="center" justify="space-between">
        <Button
          type="text"
          icon={<ImportOutlined />}
          onClick={() => {
            setPlay(false)
            props.onHide({
              timer: props.timer,
              timeLeft,
              play,
              transitionDate: new Date().toISOString()
            })
          }}
        />
        <div style={{ flexGrow: 1, textAlign: 'center', ['WebkitAppRegion' as string]: 'drag' }}>
          <span>
            <HolderOutlined />
          </span>
        </div>
        <Button
          type="text"
          color="danger"
          icon={<CloseOutlined />}
          onClick={() => {
            props.onClose()
          }}
        />
      </Flex>
      <Flex justify="center">
        <Typography.Paragraph style={{ fontSize: '48px', margin: '0' }}>
          {timerInfo.time}
        </Typography.Paragraph>
      </Flex>
      <Flex align="center" justify="center">
        <Space align="center" split={<Divider type="vertical" />}>
          <Tooltip key="btn-search" title="play/pause">
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
          </Tooltip>
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
        </Space>
      </Flex>
    </>
  )
}

export default TimerWidget
