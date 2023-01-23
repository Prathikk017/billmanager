import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { format } from 'date-fns/esm';
import styles from '../styles/modules/billItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteBill } from '../slices/billSlice';
import { toast } from 'react-hot-toast';
import BillModal from './BillModal';


function BillItem({ bill }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);


  const handleDelete = () => {
      dispatch(deleteBill(bill.id));
      toast.success('Bill Deleted Successfully');
  };  
  
  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
    <div className={styles.item}>
        <div className={styles.billDetails}>
            <div className={styles.texts}>
                <p className={styles.billText}>{bill.description}</p>
                <p className={styles.billText}>{bill.category}</p>
                <p className={styles.billText}>{bill.amount}</p>
                <p className={styles.billText}>{format(new Date(bill.date), 'dd/MM/yyyy')}</p>
            </div>
        </div>
    <div className={styles.billActions}>
        <div className={styles.icon} 
        onClick={handleEdit}
        onKeyDown={handleEdit}
        role="button"
        tabIndex={0}>
            <MdEdit />
        </div> 
        <div className={styles.icon}
         onClick={handleDelete}
         onKeyDown={handleDelete}
         role="button"
         tabIndex={0}>
            <MdDelete />
        </div>
    </div>
    </div>
      
      <BillModal 
      type="update" 
      bill={bill}
      modalOpen={updateModalOpen} 
      setModalOpen={setUpdateModalOpen} />
    </>
  )
}

export default BillItem;