import React, { useState } from 'react'
import styles from './styles/switch.module.scss'

interface Props {
  label?: string
  id?: string
  name?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  className?: string
  titleClassName?: string
  emit?: (event: React.ChangeEvent<HTMLInputElement>, state: boolean) => void
}

const Switch = ({
  label,
  id,
  name,
  value,
  checked = false,
  disabled = false,
  className,
  titleClassName,
  emit,
}: Props) => {
  const [isChecked, setChecked] = useState(checked)

  console.log('styles', styles)
  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    setChecked(!isChecked)

    if (emit) {
      emit(event, !isChecked)
    }
  }

  return (
    <label htmlFor={id} className={`${styles['switch-button']} ${className ?? ''}`}>
      {label && <div className={`${titleClassName ?? ''}`}>{label}</div>}
      <div>
        <input
          id={id}
          name={name}
          value={value}
          onChange={toggle}
          checked={isChecked}
          disabled={disabled}
          type="checkbox"
        />
        <i></i>
      </div>
    </label>
  )
}

export default Switch
