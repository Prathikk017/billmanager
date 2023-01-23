import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '../styles/modules/modal.module.scss';
import {MdOutlineClose} from 'react-icons/md';
import Button from './Button';
import {useDispatch} from 'react-redux';
import { addBill, updateBill } from '../slices/billSlice';
import { v4 as uuid} from 'uuid';


 
 
 

  
function BillModal({type, modalOpen, setModalOpen, bill}) {
    const Bill = window.localStorage.getItem("billList"); 
    const data= JSON.parse(Bill);
    const bills = data.map((total) => total = parseInt(total.amount)); 
    const Total = bills.reduce(function(sum,i){return sum + i} , 0);
    
    const data1 = window.localStorage.getItem("budget");
    const Budget = parseInt(JSON.parse(data1));

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('food&dining');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
   
    useEffect(()=> {
        if(type === 'update' &&  bill){
            setDescription(bill.description);
            setCategory(bill.category);
            setAmount(bill.amount);
            setDate(bill.date);
        }else{
            setDescription('');
            setCategory('food&dining');
            setAmount('');
            setDate('');
        }
    }, [type, bill, modalOpen]);

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(description && category && amount && date){
            if(Total <Budget){ 
            if(type === 'add'){
                 
            dispatch(
                addBill({
                 id: uuid(),
                 description: description,
                 category: category,
                 amount: amount,
                 date: date,
                })
            );
            toast.success('Bill Added Successfully');
           }
        }else{
            toast.error('Bill exceeding budget');
        } 
            if(type === 'update'){
            if(bill.description !== description || bill.category !== category || bill.amount !== amount || bill.date !== date){
                dispatch(updateBill({
                    ...bill,
                    description: description,
                    category: category,
                    amount: amount,
                    date: date,
                })
                );
                toast.success('Bill Updated Successfully')
            }else{
                toast.error('Bill Not Changed');
            }
          }
           setModalOpen(false);
        }else{
            toast.error('Fill the details');
            }
         
    };
    
  return (
    modalOpen && (    
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={()=> setModalOpen(false)} onKeyDown={()=> setModalOpen(false)} tabIndex={0} role="button">
                <MdOutlineClose />
            </div>
        <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
            <h1 className={styles.formTitle}>{type === 'update' ? 'Update' : 'Add'} Bill</h1>
            <label htmlFor="description">
                Description
                <input type="text" 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label htmlFor="category">
                Category
                <select name="category" id="category" 
                value={category}
                onChange={(e)=>setCategory(e.target.value)}>
                <option value="food&dining">Food & Dining</option>
                <option value="utility">Utility</option>
                <option value="shopping">Shopping</option>
                <option value="education">Education</option>
                <option value="personalcare">Personal Care</option>
                <option value="travel">Travel</option>
                <option value="other">Other</option>
                </select>
            </label>
            <label htmlFor="amount">
                Amount
                <input type="number" min="1" id="amount" 
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}  />
            </label>
            <label htmlFor="date">
                Date
                <input type="date" id="date"
                value={date} 
                onChange={(e)=>setDate(e.target.value)} />
            </label>
            <div className={styles.buttonConatiner}>
                <Button type="submit" variant="primary">{type === 'update' ? 'Update' : 'Add'} Bill</Button>
                <Button type="button" variant="secondary" onClick={()=> setModalOpen(false)} onKeyDown={()=> setModalOpen(false)}>Cancel</Button>
            </div>
        </form>
    </div>
    </div>
    )

  );
}

export default BillModal;