import { useRef, useState } from "react";
import "./Autocomplete.css";

export interface InputRef {
  focus: () => void;
  blur: () => void;
  setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => void;
  select: () => void;
  input: HTMLInputElement | null;
  nativeElement: HTMLElement | null;
}

export interface AutocompleteProps {
  /** Label of input */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  // Default value for input
  defaultValue?: string
  // Value of input
  value?: string
  // Options for autocompletion
  options?: string[]
  // handle change value event
  onChange?: (value: string) => void

  // handle onSearch event
  onSearch?: (value: string) => void

  // handle on select event
  onSelect?: (value: string) => void
}

/** Primary UI component for input with autocompletion */
export const Autocomplete = ({
  label,
  onClick,
  defaultValue,
  options,
  onChange,
  value,
  onSearch,
  onSelect,
}: AutocompleteProps) => {
  const [isfocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')
  const [showOptions, setShowOptions] = useState(false)
  const onfocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)
  const ref = useRef<HTMLInputElement>(null)
  const inputWrapperRef = useRef(null)
  const onClickInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    ref.current?.focus()
    onClick?.()
  }

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value)
    onChange?.(e.target.value)
    onSearch?.(e.target.value)
    if (e.target.value.trim()) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }

  const handleOnSelect = (selectedValue: string) => {
    setInternalValue(selectedValue)
    onChange?.(selectedValue)
    onSelect?.(selectedValue)
    setShowOptions(false)
  }

  return (
    <>
      {label && (
        <div className="label">
          {label}
        </div>
      )}
      <div className="input-container">
        <div ref={inputWrapperRef} className={`input-wrapper ${isfocused ? 'input-active' : ''}`} onClick={onClickInput}>
          <input value={value} onChange={onChangeEvent} ref={ref} onFocus={onfocus} onBlur={onBlur} defaultValue={defaultValue || ''} />
        </div>
        {showOptions && (
          <div className="options-container" style={{ top: inputWrapperRef?.current?.clientHeight + 8 }}>
            {options?.map((option: string) => (
              <div className="option-item" key={option} onClick={() => handleOnSelect(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
