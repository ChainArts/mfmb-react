import React, { useState, useEffect } from 'react'

const DelayedFallback = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 6000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {show && <div className="placeholder">Loading ...</div>}
    </>
  )
}
export default DelayedFallback