import React from 'react'
import { useSelector } from 'react-redux';
import BillItem from './BillItem';

function AppContent() {
  const billList = useSelector(state => state.bill.billList);
  const sortedBillList = [...billList];
  sortedBillList.sort((a,b) => new Date(a.amount) - new Date(b.amount));
  const filterStatus = useSelector((state) => state.bill.filterStatus);
  
  const filteredBillList = sortedBillList.filter(item => {
    if(filterStatus === 'all'){
      return true;
    }
    return item.category === filterStatus;
    
  })

  return (

    <div >
      {filteredBillList && filteredBillList.length > 0 
      ? filteredBillList.map((bill) => <BillItem key={bill.id} bill={bill}/>)
      : 'no bill to show'} 
    </div>
  )
}

export default AppContent;