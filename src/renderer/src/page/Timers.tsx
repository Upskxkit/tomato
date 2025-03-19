import { Col, Empty, FloatButton, Row } from 'antd';
import { Timer } from '../components/Timer';
import { useTimerModalStore, useTimersStore } from '../store';
import {
    PlusOutlined,
} from '@ant-design/icons';
import TimerModal from '../components/TimerModal';
import { notify } from '../helpers/notify';


export default function Timers() {
    const timers = useTimersStore((state) => state.timers);
    const updateTimer = useTimersStore((state) => state.updateTimer);
    const deleteTimer = useTimersStore((state) => state.deleteTimer);

    const timerModalVisible = useTimerModalStore(state => state.visible);
    const timerModalMode = useTimerModalStore(state => state.mode);
    const timerModalTimer = useTimerModalStore(state => state.timer);
    const timerModalOpen = useTimerModalStore(state => state.open);
    const timerModalClose = useTimerModalStore(state => state.close);

    return (
        <>
            {
                !timers.length ? <Row justify='center'>
                    <Col><Empty /></Col>
                </Row> :

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {
                            timers.map((timer) => <Col className="gutter-row" span={8}>
                                <Timer timer={timer} key={timer.id} onChange={updateTimer} onDelete={deleteTimer} onTimeOut={() => {
                                    notify('Timeout', 'Your timer has timed out!');
                                }} />
                            </Col>)
                        }

                    </Row>
            }
            <FloatButton.Group shape="square">
                <FloatButton key={'add'} icon={<PlusOutlined onClick={() => timerModalOpen()} />} />
                <FloatButton.BackTop key={'back-top'} visibilityHeight={0} />
            </FloatButton.Group>
            {timerModalVisible ? <TimerModal
                open={timerModalVisible}
                mode={timerModalMode}
                timer={timerModalTimer}
                onCancel={timerModalClose}
                onChange={(updatedTimer) => {
                    updateTimer(updatedTimer);
                    timerModalClose();
                }}
                onDelete={deleteTimer} /> : null}
        </>
    )
}
