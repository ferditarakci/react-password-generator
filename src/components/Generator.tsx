import React, { useEffect, useRef, useState } from 'react'
import Switch from './Switch'
import RangeSlider from './RangeSlider'

interface Settings {
  value: string
  label: string
  chars: string
}

const minPassLen: number = 4
const maxPassLen: number = 64
const defaultPassLen: number = 16

const settings: Settings[] = [
  { value: 'upper', label: 'Include uppercase letters (ABC)', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { value: 'lower', label: 'Include lowercase letters (abc)', chars: 'abcdefghijklmnopqrstuvwxyz' },
  { value: 'number', label: 'Include numbers (123)', chars: '0123456789' },
  { value: 'symbol', label: 'Include symbols (!$?)', chars: "!@#$%&(')*^-\\/.,:;=?[+]_{~}|" },
]

function Generator() {
  const selectedPassLen: number = Number(localStorage.getItem('passLen') ?? defaultPassLen)
  const selectedSettings: string[] = JSON.parse(localStorage.getItem('settings') ?? '[]')

  const [characters, setCharacters] = useState(
    selectedSettings.length ? selectedSettings : ['upper', 'lower', 'number'],
  )

  const [pass, setPass] = useState('')
  const [passLen, setPassLen] = useState(selectedPassLen)
  const copiedPassRef = useRef<HTMLInputElement>(null)
  const [isCopied, setCopied] = useState(false)

  const generatePassword = () => {
    // debugger
    let newPass = '',
      combineChars = ''

    for (const charset of characters) {
      const { chars } = settings.find((b) => charset === b.value) ?? {}

      if (chars) {
        combineChars += chars
      }
    }

    do {
      if (!combineChars) break

      newPass += combineChars[Math.floor(Math.random() * combineChars.length)]
    } while (newPass.length < passLen)

    setPass(newPass.slice(0, passLen))
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(pass).then(() => {
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    })
  }

  const emitFn = (event: React.ChangeEvent<HTMLInputElement>, state: boolean) => {
    setCharacters((prevState) => {
      if (!state && Array.isArray(prevState)) {
        return prevState.filter((v) => v !== event.target.value)
      }

      return [...prevState, event.target.value]
    })
  }

  useEffect(() => {
    localStorage.setItem('passLen', String(passLen))

    generatePassword()
  }, [passLen])

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(characters))

    generatePassword()
  }, [characters])

  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Generate Password</h1>
        <h2>Create strong, secure passwords in seconds</h2>
      </header>

      <section>
        <div className="row">
          <h3 className="row-title">Generated password</h3>

          <div className="line flex between password-container">
            <div className="line-title">
              <strong className="password">{pass}</strong>
            </div>
            <div className="actions">
              <button onClick={copyPassword} type="button" className="copy">
                Copy
              </button>
              <button onClick={generatePassword} type="button" className="refresh">
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <h3 className="row-title">Character Length</h3>

          <div className="line range flex between">
            <div className="line-title">{minPassLen}</div>
            <div>
              <RangeSlider
                min={minPassLen}
                max={maxPassLen}
                value={passLen}
                setValue={setPassLen}
              />
            </div>
            <div className="line-title">{passLen}</div>
          </div>
        </div>

        <div className="row">
          <h3 className="row-title">Settings</h3>

          {settings.map((a) => (
            <Switch
              key={a.value}
              className="line flex between"
              titleClassName="line-title"
              label={a.label}
              value={a.value}
              checked={characters.includes(a.value)}
              disabled={characters.length === 1 && characters[0] === a.value}
              emit={emitFn}
            />
          ))}
        </div>
      </section>

      {isCopied && (
        <div className="copied-password line line-title" ref={copiedPassRef}>
          Password copied successfully
        </div>
      )}
    </div>
  )
}

export default Generator
