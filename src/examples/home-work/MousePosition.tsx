import { useState, useEffect } from 'react'

export function MousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section>
      <h2>8. Mouse Position</h2>
      <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
    </section>
  )
}
