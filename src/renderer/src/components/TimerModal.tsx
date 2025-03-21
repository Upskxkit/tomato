import { DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Input, InputNumber, Modal, Space } from 'antd'
import { useState } from 'react'
import { formatTime } from '../helpers/timer'
import { Timer } from '../store'

interface TimerModalProps {
  open: boolean
  timer: Timer
  mode: 'edit' | 'create'
  onCancel?: () => void
  onChange?: (item: Timer) => void
  onDelete?: (item: Timer) => void
}

const TimerModal = ({
  open,
  onCancel,
  onChange = () => {},
  onDelete = () => {},
  timer,
  mode
}: TimerModalProps) => {
  console.log(timer, mode)
  const [title, setTitle] = useState(timer.title)
  const [time, setTime] = useState(() => {
    const [hours, minutes, seconds] = formatTime(timer.time_in_sec).split(':').map(Number)

    return { hours, minutes, seconds }
  })

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Create timer' : 'Edit timer'}
      okText="Save"
      closable={false}
      width={400}
      onCancel={onCancel}
      onOk={() => {
        onChange({
          id: timer.id,
          title,
          time_in_sec: time.hours * 3600 + time.minutes * 60 + time.seconds
        })
      }}
    >
      <></>
      {mode === 'edit' ? (
        <Button
          aria-description="Delete timer"
          type="text"
          onClick={() => {
            onDelete(timer)
          }}
          danger
          shape="round"
          icon={<DeleteOutlined />}
          style={{
            position: 'absolute',
            top: '12px',
            insetInlineEnd: '12px',
            padding: '0',
            fontWeight: '600',
            width: '32px',
            height: '32px',
            cursor: 'pointer'
          }}
        />
      ) : null}
      <div style={{ padding: '16px' }}>
        <Space direction="vertical" size="large">
          <Input
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Timer title"
          />
          <Space>
            <InputNumber
              size="large"
              variant="filled"
              defaultValue={time.hours}
              onChange={(value) => setTime({ ...time, hours: value ?? time.hours })}
              min={0}
              max={99}
              changeOnWheel
            />
            <InputNumber
              size="large"
              variant="filled"
              defaultValue={time.minutes}
              onChange={(value) => setTime({ ...time, minutes: value ?? time.minutes })}
              min={0}
              max={59}
              changeOnWheel
            />
            <InputNumber
              size="large"
              variant="filled"
              defaultValue={time.seconds}
              onChange={(value) => setTime({ ...time, seconds: value ?? time.seconds })}
              min={0}
              max={59}
              changeOnWheel
            />
          </Space>
        </Space>
        <Divider />
      </div>
    </Modal>
  )
}

export default TimerModal
