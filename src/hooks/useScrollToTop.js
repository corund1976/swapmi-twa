import { useEffect } from 'react'

const useScrollToTop = () => {
  useEffect(() => {
    const delayedAction = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }, 100)

    return () => clearTimeout(delayedAction);
  }, [])
}

export default useScrollToTop