import { message } from 'antd';
import { ChangeEvent,FC,useState } from 'react';

import request from '@/service/index';
import { useStore } from '@/store/index';


import CountDown from '../CountDown';

import styles from './index.module.scss';

interface Props {
  isShow: boolean
  onClose: () => void
}

const Login: FC<Props> = ({ isShow = false,onClose }) => {
  const store = useStore();
  const [form,setForm] = useState({ phone: '',verify: '' })
  const [isShowVerifyCode,setIsShowVerifyCode] = useState(false)

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name,value } = e.target

    setForm({ ...form,[name]: value })
  }

  const handleGetVerifyCode = () => {
    if (!form.phone) {
      message.warning('请输入手机号')
      return
    }

    request.post<any>('/api/user/sendVerifyCode',{
      to: form.phone,
      templateId: 1
    }).then((res) => {
      if (res.code === 0) setIsShowVerifyCode(true)
      else message.error(res?.msg || '未知错误')
    })
  }

  const handleLogin = () => { 
    request.post<any>('/api/user/login', { ...form })
      .then((res) => {
        if (res.code === 0) {
          console.log('res',res)
          store.user.setUserInfo(res.data);
          onClose();
        } else message.error(res.msg || '未知错误');
    })
  }

  const handleOAuthGithub = () => { }

  return isShow ? <div className={styles.loginArea}>
    <div className={styles.loginBox}>
      <div className={styles.loginTitle}>
        <div>手机号登录</div>
        <div className={styles.close} onClick={onClose}>x</div>
      </div>
      <input name='phone' type="text" placeholder='请输入手机号' value={form.phone} onChange={handleFormChange} />
      <div className={styles.verifyCodeArea}>
        <input name='verify' type="text" placeholder='请输入验证码' value={form.verify} onChange={handleFormChange} />
        <span className={styles.verifyCode} onClick={handleGetVerifyCode}>{isShowVerifyCode ? <CountDown time={10} onEnd={() => setIsShowVerifyCode(false)} /> : '获取验证码'}</span>
      </div>
      <div className={styles.loginBtn} onClick={handleLogin}>登录</div>
      <div className={styles.otherLogin} onClick={handleOAuthGithub}>使用 Github 登录</div>
      <div className={styles.loginPrivacy}>
        注册登录即表示同意
        <a href="" target='_blank' rel='noreferrer'>隐私政策</a>
      </div>
    </div>
  </div> : null;
};

export default Login;
