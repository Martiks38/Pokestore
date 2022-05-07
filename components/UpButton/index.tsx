import { useCallback, useEffect, useState } from 'react'

function UpButton() {
  const [viewBtn, setViewBtn] = useState(false)
  const handleView = useCallback(() => {
    const see = window.scrollY > 1500
    setViewBtn(see)
  }, [])

  useEffect(() => {
    handleView()

    window.addEventListener('scroll', handleView)
    return () => window.removeEventListener('scroll', handleView)
  }, [handleView])

  const toUp = () => window.scrollTo(0, 0)

  return <>{viewBtn && <button className="upButton" onClick={toUp}></button>}</>
}

export default UpButton
