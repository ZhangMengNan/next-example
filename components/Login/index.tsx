import { FC } from 'react';

interface Props {
  isShow: boolean
  onClose: () => void
}

const Login: FC<Props> = () => {
  return <div>this is login</div>;
};

export default Login;
