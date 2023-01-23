import React from 'react';
import { Toaster } from 'react-hot-toast';
import PageTitle from './components/PageTitle';
import styles from './styles/modules/app.module.scss';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import ChartModal from './components/ChartModal';


function App() {
 
  return (
    <>
    <div className="container">
      <PageTitle>Bill Manager</PageTitle>

      <div className={styles.app__wrapper}>
       <AppHeader />
       <ChartModal/>
      </div>
       <AppContent />
       
    </div>
    <Toaster toastOptions={{
      style: {
        fontSize: '1.5rem',
      },
    }} />
    </>
  );
}

export default App;
