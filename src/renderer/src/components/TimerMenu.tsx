import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';

import './TimerMenu.css';
import { Menu } from 'antd';
import { useEffect, useRef } from 'react';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

interface TimerProps {
    visible: boolean;
    x: number;
    y: number;
    isRunning: boolean;
    onClose: () => void;
    onClick: MenuClickEventHandler;
}

export const TimerPopup = ({ visible, x, y, isRunning, onClose = () => { }, onClick = () => { } }: TimerProps) => {
    const items = [{
        label: 'Edit',
        key: 'edit',
        icon: <EditOutlined />,
        disabled: isRunning
    },
    {
        label: 'Delete',
        key: 'delete',
        icon: <DeleteOutlined />,
    }]
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent): void => {
        if (menuRef.current && !menuRef.current.contains(event.target as Element)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div ref={menuRef} className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
            <Menu items={items} onClick={onClick}></Menu>
        </div>
    );
};

export default TimerPopup;