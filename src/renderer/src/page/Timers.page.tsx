import { PlusOutlined } from '@ant-design/icons'
import { Timer } from '@renderer/components/Timer'
import TimerModal from '@renderer/components/TimerModal'
import { notify } from '@renderer/helpers/notify'
import { onHideWidget, UpdatedState } from '@renderer/helpers/widget'
import { useTimerModalStore, useTimersStore } from '@renderer/store'
import { Col, Empty, FloatButton, Row } from 'antd'
import { useEffect, useState } from 'react'

export default function TimersPage() {
  const timers = useTimersStore((state) => state.timers)
  const addTimer = useTimersStore((state) => state.addTimer)
  const updateTimer = useTimersStore((state) => state.updateTimer)
  const deleteTimer = useTimersStore((state) => state.deleteTimer)
  const [updatedState, setUpdatedState] = useState<(UpdatedState & { timerId: string }) | null>(
    null
  )

  useEffect(() => {
    window.timers.get().then((timers) => {
      useTimersStore.setState((prev) => ({
        ...prev,
        timers: timers
      }))
    })

    onHideWidget((data) => {
      setUpdatedState({
        timerId: data.timer.id!,
        timeLeft: data.timeLeft,
        play: data.play,
        transitionDate: data.transitionDate
      })
    })
  }, [])

  useEffect(() => {
    // setUpdatedState()
  }, [])

  const timerModalVisible = useTimerModalStore((state) => state.visible)
  const timerModalMode = useTimerModalStore((state) => state.mode)
  const timerModalTimer = useTimerModalStore((state) => state.timer)
  const timerModalOpen = useTimerModalStore((state) => state.open)
  const timerModalClose = useTimerModalStore((state) => state.close)

  return (
    <>
      {!timers.length ? (
        <Row justify="center">
          <Col>
            <Empty />
          </Col>
        </Row>
      ) : (
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 8]}>
          {timers.map((timer) => (
            <Col className="gutter-row" span={8} xs={24} sm={12} xl={6} key={timer.id}>
              <Timer
                timer={timer}
                onChange={updateTimer}
                onDelete={deleteTimer}
                onTimeOut={() => {
                  notify('Timeout', 'Your timer has timed out!')
                }}
                updatedState={timer.id === updatedState?.timerId ? updatedState : null}
              />
            </Col>
          ))}
        </Row>
      )}
      <FloatButton.Group shape="square">
        <FloatButton key={'add'} icon={<PlusOutlined onClick={() => timerModalOpen()} />} />
        <FloatButton.BackTop key={'back-top'} visibilityHeight={0} />
      </FloatButton.Group>
      {timerModalVisible ? (
        <TimerModal
          open={timerModalVisible}
          mode={timerModalMode}
          timer={timerModalTimer}
          onCancel={timerModalClose}
          onChange={(timerData) => {
            if (timerModalMode == 'create') {
              addTimer(timerData)
            } else {
              updateTimer(timerData)
            }

            timerModalClose()
          }}
          onDelete={(timeData) => {
            deleteTimer(timeData)
            timerModalClose()
          }}
        />
      ) : null}
    </>
  )
}
