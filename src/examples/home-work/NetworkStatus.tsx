import { useState, useEffect } from 'react'

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <section>
      <h2>12. Network Status</h2>
      <p>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
    </section>
  )
}
