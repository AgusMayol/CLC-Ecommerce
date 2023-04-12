import { useState, createContext, useContext } from 'react'

import {
  CheckCircleIcon, ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const Notification = ({ type, message }) => {
  const notificationStyle = {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    zIndex: 100,
  }

  const notificationStyle2 = {
    backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
    color: 'white',
    padding: '10px 20px 10px 20px',
    borderRadius: 10
  }

  if (!message) return

  return (
    <div style={notificationStyle} className='w-full flex justify-center items-center'>

      {type === 'success' ? (
        <div className='w-auto flex justify-center items-center font-semibold text-[15px]' style={notificationStyle2}>
          <CheckCircleIcon className='h-6 w-6 mr-2' />

          {message}
        </div>
      ) : (
        <div className='w-auto flex justify-center items-center font-semibold text-[15px]' style={notificationStyle2}>
          <ExclamationCircleIcon className='h-6 w-6 mr-2' />
          {message}
        </div>
      )}

    </div>
  )
}

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notificationData, setNotificationData] = useState({
    type: 'error',
    text: ''
  })

  const setNotification = (type, text, timeout) => {
    setNotificationData({ type, text })
    setTimeout(() => {
      setNotification({ type, text: '' })
    }, timeout * 1000)
  }

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Notification type={notificationData.type} message={notificationData.text} />
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}