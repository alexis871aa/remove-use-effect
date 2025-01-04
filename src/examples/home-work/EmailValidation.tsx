import { useState, useEffect } from 'react'

export function EmailValidation() {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValid(emailRegex.test(email))
  }, [email])

  return (
    <section>
      <h2>6. Email Validation</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <p>Email is {isValid ? 'valid' : 'invalid'}</p>
    </section>
  )
}
