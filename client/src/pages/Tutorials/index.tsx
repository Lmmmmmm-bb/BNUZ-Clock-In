import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './index.css';
import { Steps, Result, Button, Space } from 'antd';

import Message, { IMessageProps } from '../../components/Message';
import { patchRequest } from '../../utils/http';
import { IBaseResponse } from '../../models/response.model';
import { encrypt } from '../../utils/crypto';

const { Step } = Steps;

const stepTitle = [
  '提醒事项',
  '登录 pushplus',
  '查看 Token',
  '提交 Token',
  '完成'
];

const TutorialsZeroStep: FC = () => {
  return (
    <div className='tutorials-step-zero'>
      <h2>系统使用微信公众号 pushplus 提供的消息推送服务</h2>
      <div>1. 需要关注公众号</div>
      <div>2. 每日打卡结果将会通过公众号推送</div>
      <div>3. 直接取消公众号关注或上传空 Token 即可停止推送</div>
      <div>4. 建议使用 PC 端查看 Token</div>
    </div>
  );
};

const TutorialsFirstStep: FC = () => {
  return (
    <div className='tutorials-step-one'>
      <div>
        登录{' '}
        <a href='https://www.pushplus.plus/' target='_blank' rel='noreferrer'>
          pushplus
        </a>
      </div>
      <img
        src='https://cdn.jsdelivr.net/gh/Lmmmmmm-bb/Image-Hosting@master/step1.jlph4bk6rs0.png'
        alt=''
      />
    </div>
  );
};

const TutorialsSecondStep: FC = () => {
  return (
    <div className='tutorials-step-second'>
      <div>
        点击
        <a
          href='https://www.pushplus.plus/push1.html'
          target='_blank'
          rel='noreferrer'
        >
          「一对一推送」
        </a>
      </div>
      <img
        src='https://cdn.jsdelivr.net/gh/Lmmmmmm-bb/Image-Hosting@master/step2.5nnjpgnt3lc0.png'
        alt=''
      />
    </div>
  );
};

const TutorialsThirdStep: FC = () => {
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
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

  const handleTokenSubmit = async () => {
    try {
      setIsBtnDisabled(true);
      const response: IBaseResponse = await patchRequest('profile/update', {
        studentId: id,
        token: encrypt(token, id)
      });
      if (response.status === 200) {
        setMessageProps({
          ...messageProps,
          type: 'success',
          text: response.msg,
          visible: true
        });
        setToken('');
      } else {
        setMessageProps({
          ...messageProps,
          type: 'error',
          text: response.msg,
          visible: true
        });
      }
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
    <div className='tutorials-step-third'>
      <Message {...messageProps} />
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
        <label htmlFor='token'>Token</label>&nbsp;&nbsp;&nbsp;
        <input
          id='token'
          className='main-input'
          type='password'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button
        className='main-button'
        disabled={isBtnDisabled}
        onClick={handleTokenSubmit}
      >
        提 交
      </button>
    </div>
  );
};

const Tutorials: FC = () => {
  const router = useHistory();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className='tutorials-container'>
      <Steps current={currentStep}>
        {stepTitle.map((title) => (
          <Step title={title} key={title} />
        ))}
      </Steps>
      <div className='tutorials-main'>
        {currentStep === 0 ? (
          <TutorialsZeroStep />
        ) : currentStep === 1 ? (
          <TutorialsFirstStep />
        ) : currentStep === 2 ? (
          <TutorialsSecondStep />
        ) : currentStep === 3 ? (
          <TutorialsThirdStep />
        ) : (
          <Result
            status='success'
            title='你已经完成打卡结果每日推送的配置啦！'
            subTitle='更新 Token 后记得重新提交哦'
          />
        )}
      </div>
      <div className='tutorials-action'>
        <Space size={30}>
          {currentStep === 0 ? (
            <Button onClick={() => router.goBack()}>返回</Button>
          ) : (
            <Button onClick={() => setCurrentStep(currentStep - 1)}>
              上一步
            </Button>
          )}
          {currentStep !== 4 && (
            <Button
              type='primary'
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              下一步
            </Button>
          )}
          {currentStep === 4 && (
            <Button onClick={() => router.goBack()}>完成</Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default Tutorials;
