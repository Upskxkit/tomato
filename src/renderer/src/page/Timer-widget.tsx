export const TimerWidget = () => {
  return (
    <div
      style={{
        ['WebkitAppRegion' as string]: 'drag',
        width: '100%',
        height: '40px',
        background: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      <div style={{ color: '#fff', padding: '10px' }}>Timer Widget</div>
    </div>
  )
}
