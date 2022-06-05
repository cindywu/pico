import React, { useEffect, useState } from 'react'
import styles from './thing.module.css'

export default function Thing() {
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [directoryHandle, setDirectoryHandle] = useState<any>(null)

  useEffect(() => {
    setIsSupported(typeof (window as any).showDirectoryPicker === 'function')
  }, [])

  useEffect(() => {
    console.log('isSupported', isSupported)
  }, [isSupported])

  useEffect(() => {
    console.log('directoryHandle', directoryHandle)
    const file = directoryHandle && directoryHandle.getFileHandle(`beep.pdf`)
    console.log('file', file)
  }, [directoryHandle])

  const readWriteOptions = { mode: 'readwrite' }

  const setRootDirectory = async () => {
    const directoryHandle: any = await (window as any).showDirectoryPicker()
    if (!directoryHandle) {
      return undefined
    }
    let granted = (await directoryHandle.queryPermission(readWriteOptions)) === 'granted'
    if (!granted) {
      granted = (await directoryHandle.requestPermission(readWriteOptions)) === 'granted'
    }
    setDirectoryHandle(directoryHandle)
    return { directoryHandle, granted}
  }

  return (
    <div className={styles.container}>
      <div className={styles.directory}>
        {directoryHandle ? `Directory: ${directoryHandle.name}` : `No directory selected`}
        {/* {directoryHandle &&
          <div>See files</div>
        } */}
      </div>
      <div>
        <button className={styles.button} onClick={() => setRootDirectory()}>
          Pick Directory
        </button>
      </div>
    </div>
  )
}
