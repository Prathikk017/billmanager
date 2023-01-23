import React, { useState } from 'react'
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import BillModal from '../components/BillModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterStatus } from '../slices/billSlice';
import ChartModal from './ChartModal';


function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalsOpen, setModalsOpen] = useState(false);
  const [budget, setBudget] = useState('');
  const filterStatus = useSelector((state) => state.bill.filterStatus);
 
  const dispatch = useDispatch()

  const updateFilter = (e) => {   
     dispatch(updateFilterStatus(e.target.value));
  };

  const handleClick = (e) =>{
    window.localStorage.setItem('budget', JSON.stringify(budget));
    setBudget(budget);
  }
  

  return (
    <>
    <div className={styles.appHeader}>
     <Button variant="primary" onClick={()=> setModalOpen(true)} >Add Bill</Button>
     
     <Button variant="secondary" onClick={()=> setModalsOpen(true)}id="overview">Overview</Button>
     <SelectButton id="category" value={filterStatus} onChange={updateFilter}>
        <option value="all">All</option>
        <option value="food&dining">Food & Dining</option>
        <option value="utility">Utility</option>
        <option value="shopping">Shopping</option>
        <option value="education">Education</option>
        <option value="personalcare">Personal Care</option>
        <option value="travel">Travel</option>
        <option value="other">Other</option>
     </SelectButton>
     <div>
    <Button variant="primary" onClick={handleClick}>Budget</Button>
    <input type="number" min="1" placeholder="Enter your Budget" value={budget} onChange={(e) => setBudget(e.target.value)} style={{
      borderRadius:"5px",
      height: "34px",
    }}/>
    </div>
     <BillModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
     <ChartModal modalsOpen={modalsOpen} setModalsOpen={setModalsOpen}/>
    </div>
    </>  
  )
}

export default AppHeader;