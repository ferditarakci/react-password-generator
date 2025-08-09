import React, { useEffect, useRef } from 'react'
import styles from './styles/slider.module.scss'

interface Props {
  id?: string
  name?: string
  step?: number
  min?: number
  max?: number
  value?: number
  disabled?: boolean
  setValue?: (val: number) => void
}

const RangeSlider = ({
  id,
  name,
  step = 1,
  min = 1,
  max = 100,
  value,
  disabled = false,
  setValue,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const inputRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event

    const value = Number(target.value)

    const progress = ((value - min) / Number(target.max)) * 100

    target.style.background = `linear-gradient(to right, #cf5fff ${progress}%, #5a4b6e ${progress}%)`
    target.style.setProperty('--rotate', `${(value - min) * 36}deg`)

    if (setValue) setValue(value)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.dispatchEvent(new InputEvent('input', { bubbles: true }))
    }
  }, [])

  return (
    <input
      id={id}
      name={name}
      step={step}
      min={min}
      max={max}
      value={value}
      disabled={disabled}
      ref={inputRef}
      onInput={inputRange}
      type="range"
      className={styles.slider}
    />
  )
}

export default RangeSlider
