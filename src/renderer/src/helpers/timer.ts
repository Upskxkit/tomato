//TODO: redo to use ms instead of seconds 

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export const calcTimeLeft = (transitionDate: string, timeLeft: number) => {
  const endDate = new Date(transitionDate)
  endDate.setSeconds(endDate.getSeconds() + timeLeft)
  const now = new Date()

  return Math.floor((endDate.getTime() - now.getTime()) / 1000)
}
