import React, { useEffect, useState } from 'react'

export default function Thing() {
  const [isSupported, setIsSupported] = useState<boolean>(false)

  useEffect(() => {
    setIsSupported(typeof (window as any).showDirectoryPicker === 'function')
  }, [])

  useEffect(() => {
    console.log('isSupported', isSupported)
  }, [isSupported])


  return (
    <div>
      <button className={`.pick-file`}>
        Pick File
      </button>
    </div>
  )
}
