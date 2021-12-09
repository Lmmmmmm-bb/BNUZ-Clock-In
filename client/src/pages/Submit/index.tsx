import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './index.css';
import { v4 as uuid } from 'uuid';

import Message, { IMessageProps } from '../../components/Message';
import { getRequest, putRequest } from '../../utils/http';
import { encrypt } from '../../utils/crypto';
import { IBaseResponse } from '../../models/response.model';

const Submit: FC = () => {
  const router = useHistory();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const onClose = () => {
    setMessageProps({ ...messageProps, visible: false });
  };
  const [messageProps, setMessageProps] = useState<IMessageProps>({
    type: 'success',
    text: '',
    visible: false,
    onClose
  });

  useEffect(() => {
    const id = localStorage.getItem('id');
    id && setId(id);
  }, []);

  const handleSubmitClick = async () => {
    try {
      setIsBtnDisabled(true);
      const salt = uuid();
      const response: IBaseResponse = await putRequest('profile/create', {
        studentId: id,
        encryptedPwd: encrypt(password, salt),
        salt
      });
      if (response.status === 200) {
        setMessageProps({
          ...messageProps,
          type: 'success',
          text: response.msg,
          visible: true
        });
        setPassword('');
      } else {
        setMessageProps({
          ...messageProps,
          type: 'error',
          text: response.msg,
          visible: true
        });
      }
      localStorage.setItem('id', id);
    } catch (err: any) {
      setMessageProps({
        ...messageProps,
        type: 'error',
        text: err.message,
        visible: true
      });
    } finally {
      setIsBtnDisabled(false);
    }
  };

  return (
    <div className='submit-container'>
      <Message {...messageProps} />
      <div className='submit-main'>
        <div className='input-block'>
          <label htmlFor='id'>学 号</label>&nbsp;&nbsp;&nbsp;
          <input
            id='id'
            className='main-input'
            type='tel'
            maxLength={10}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className='input-block'>
          <label htmlFor='pwd'>密 码</label>&nbsp;&nbsp;&nbsp;
          <input
            id='pwd'
            className='main-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='info-block'>
          <span onClick={() => router.push('tutorials')}>打卡结果推送</span>
        </div>
        <button
          className='main-button'
          disabled={isBtnDisabled}
          onClick={handleSubmitClick}
        >
          提 交
        </button>
      </div>
    </div>
  );
};

export default Submit;
