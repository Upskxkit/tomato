import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { useEffect, useRef } from 'react'
import './TimerMenu.css'

interface TimerProps {
  visible: boolean
  x: number
  y: number
  isRunning: boolean
  onClose: () => void
  onClick: MenuClickEventHandler
}

export const TimerPopup = ({
  visible,
  x,
  y,
  isRunning,
  onClose = () => { },
  onClick = () => { }
}: TimerProps) => {
  const items = [
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
      disabled: isRunning
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />
    }
  ]
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Element)) {
        onClose()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  if (!visible) {
    return null
  }

  return (
    <div ref={menuRef} className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
      <Menu items={items} onClick={onClick}></Menu>
    </div>
  )
}

export default TimerPopup
