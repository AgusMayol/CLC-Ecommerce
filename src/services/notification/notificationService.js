import { useState, createContext, useContext, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';
import './Notification.css';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const Notification = ({ type, message }) => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  const notificationStyle = {
    position: 'fixed',
    bottom: 10,
    right: 0,
    left: 0,
    zIndex: 100,
  };

  const notificationStyle2 = {
    backgroundColor: type === 'success' ? '#16a34a' : '#dc2626',
    color: 'white',
    padding: '10px 20px 10px 20px',
    borderRadius: 10
  };

  const hideNotification = () => {
    setShow(false);
  };

  useEffect(() => {
    if (message) {
      setShow(true);
      setTimeout(hideNotification, 5000); // Oculta la notificación después de 5 segundos
    }
  }, [message]);

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="notification"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef} style={notificationStyle} className='w-full flex justify-center items-center'>

        {type === 'success' ? (
          <div className='w-auto flex justify-center items-center font-semibold text-[15px] mx-4 lg:mx-0' style={notificationStyle2}>
            <CheckCircleIcon className='h-6 w-6 mr-2' />

            {message}
          </div>
        ) : (
          <div className='w-auto flex justify-center items-center font-semibold text-[15px] mx-4 lg:mx-0' style={notificationStyle2}>
            <ExclamationCircleIcon className='h-6 w-6 mr-2' />
            {message}
          </div>
        )}

      </div>
    </CSSTransition>
  );
};

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notificationData, setNotificationData] = useState({
    type: 'error',
    text: ''
  })

  const setNotification = (type, text, timeout) => {
    setNotificationData({ type, text })
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