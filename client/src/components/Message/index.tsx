import React, { FC, useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/solid';
import './index.css';

export interface IMessageProps {
  type: 'success' | 'warn' | 'error';
  text: string;
  visible: boolean;
  duration?: number;
  onClose: () => void;
}

const Message: FC<IMessageProps> = (props) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  useEffect(() => {
    const message = document.querySelector('.message-container');
    const { visible, duration, onClose } = props;
    if (message && visible) {
      message.className = 'message-container container-visible';
      timer && clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          message.className = 'message-container';
          visible && onClose();
        }, duration ?? 2000)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <div className='message-container'>
      <div className='message-tip'>
        {props.type === 'success' ? (
          <CheckCircleIcon
            className='message-icon'
            style={{ color: '#52c41a' }}
          />
        ) : props.type === 'error' ? (
          <XCircleIcon className='message-icon' style={{ color: '#ff4d4f' }} />
        ) : (
          <InformationCircleIcon
            className='message-icon'
            style={{ color: '#faad14' }}
          />
        )}
      </div>
      <div className='message-text'>{props.text}</div>
    </div>
  );
};

export default Message;
