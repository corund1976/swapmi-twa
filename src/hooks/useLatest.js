import { useRef, useLayoutEffect } from 'react'

const useLatest = (value) => {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef
}

export default useLatest