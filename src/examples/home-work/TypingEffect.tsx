import { useState, useEffect } from 'react'

export function TypingEffect() {
  const text = "Welcome to React useEffect Examples!"
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, 100)
      
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <section>
      <h2>17. Typing Effect</h2>
      <p style={{ minHeight: '1.5em' }}>{displayText}</p>
      {index === text.length && (
        <button onClick={() => {
          setDisplayText('')
          setIndex(0)
        }}>
          Replay
        </button>
      )}
    </section>
  )
}
