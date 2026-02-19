import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
    error: <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />,
    warning: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
  };

  const bgColors = {
    success: 'bg-green-900',
    error: 'bg-red-900',
    warning: 'bg-yellow-900'
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
        bgColors[type]
      } ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="flex items-center">
        {icons[type]}
        <span className="ml-3 text-white">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            if (onClose) onClose();
          }, 300);
        }}
        className="ml-4 text-white hover:text-gray-300"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
