import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './PageLayout.module.css';

export default function PageLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main} id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
