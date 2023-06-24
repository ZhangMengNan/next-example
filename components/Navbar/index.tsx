import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { navs } from './config';

import styles from './index.module.scss';

const Navbar: NextPage = () => {
  const { pathname } = useRouter();

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
    </div>
  );
};

export default Navbar;
