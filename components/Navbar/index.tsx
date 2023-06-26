import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd';

import Login from '../Login';
import { navs } from './config';

import type { NextPage } from 'next';
import styles from './index.module.scss';

const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleGotoEditorPage = () => {};

  const handleLogin = () => setIsShowLogin(true);

  const handleClose = () => setIsShowLogin(false);

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs.map((item) => (
          <Link legacyBehavior key={item.label} href={item.value}>
            <a className={pathname === item.value ? styles.active : ''}>
              {item.label}
            </a>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登陆
        </Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose} />
    </div>
  );
};

export default Navbar;
