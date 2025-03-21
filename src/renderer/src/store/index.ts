import { create } from 'zustand'

export type Timer = {
  time_in_sec: number
  title: string
  id?: string
}

type TimersState = {
  timers: Timer[]
  setTimers: (timers: Timer[]) => void
  addTimer: (timer: Timer) => void
  updateTimer: (timer: Timer) => void
  deleteTimer: (timer: Timer) => void
}

export const useTimersStore = create<TimersState>((set) => ({
  timers: [
    {
      time_in_sec: 5,
      title: 'Test',
      id: '1234567890'
    }
  ],
  setTimers: (timers: Timer[]) => set(() => ({ timers: timers })),
  updateTimer: (timer: Timer) =>
    set((state) => ({ timers: state.timers.map((item) => (item.id === timer.id ? timer : item)) })),
  addTimer: (timer: Timer) => set((state) => ({ timers: [...state.timers, timer] })),
  deleteTimer: (timer: Timer) =>
    set((state) => ({ timers: state.timers.filter((item) => item.id !== timer.id) }))
}))

type TimerModalState = {
  visible: boolean
  timer: Timer
  mode: 'create' | 'edit'
  open: (timer?: Timer) => void
  close: () => void
}

export const useTimerModalStore = create<TimerModalState>((set) => ({
  visible: false,
  mode: 'create',
  timer: { time_in_sec: 0, title: '' },
  close: () => set((state) => ({ ...state, visible: false, timer: { time_in_sec: 0, title: '' } })),
  open: (timer?: Timer) =>
    set((state) => ({
      ...state,
      visible: true,
      timer: timer || { time_in_sec: 0, title: '' },
      mode: timer ? 'edit' : 'create'
    }))
}))
