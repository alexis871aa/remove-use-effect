import { useState, useEffect } from 'react'

export function FormAutosave() {
  const [text, setText] = useState(() => 
    localStorage.getItem('autosave_text') || ''
  )
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  
  useEffect(() => {
    if (isDirty) {
      const saveTimeout = setTimeout(() => {
        localStorage.setItem('autosave_text', text)
        setLastSaved(new Date())
        setIsDirty(false)
      }, 1000)
      
      return () => clearTimeout(saveTimeout)
    }
  }, [text, isDirty])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    setIsDirty(true)
  }

  return (
    <section>
      <h2>23. Form Autosave</h2>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
        rows={4}
        style={{ width: '100%', maxWidth: '300px' }}
      />
      <p>
        {isDirty 
          ? 'Saving...' 
          : lastSaved 
            ? `Last saved: ${lastSaved.toLocaleTimeString()}` 
            : 'No changes'}
      </p>
    </section>
  )
}
