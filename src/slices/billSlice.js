import { createSlice } from "@reduxjs/toolkit";

const getInitialBill = () => {
  const localBillList = window.localStorage.getItem('billList');
  if(localBillList){
    return JSON.parse(localBillList)
  }
  window.localStorage.setItem('billList', JSON.stringify([]));
  return [];
};

const initialValue = {
    filterStatus: 'all',
    billList: getInitialBill(),
};

export const billSlice = createSlice({
    name: 'bill',
    initialState: initialValue,
    reducers: {
        addBill: (state, action) => {
            state.billList.push(action.payload);
            const billList = window.localStorage.getItem('billList');
            if(billList) {
                const billListArr = JSON.parse(billList);
                billListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem('billList', JSON.stringify(billListArr));
            } else{
                window.localStorage.setItem('billList', JSON.stringify([{ ...action.payload }]))
            }
        },
        deleteBill: (state, action) =>{
            const billList = window.localStorage.getItem('billList');
            if(billList){
                const billListArr = JSON.parse(billList);
                billListArr.forEach((bill, index) => {
                    if(bill.id === action.payload){
                        billListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem('billList', JSON.stringify(billListArr));
                state.billList = billListArr;
            }
        },
        updateBill: (state, action) =>{
           const billList = window.localStorage.getItem('billList');
           if(billList){
            const billListArr = JSON.parse(billList);
            billListArr.forEach((bill, index) => {
                if(bill.id === action.payload.id){
                    bill.description = action.payload.description;
                    bill.category = action.payload.category;
                    bill.amount = action.payload.amount;
                    bill.date = action.payload.date; 
                }
            });
            window.localStorage.setItem('billList', JSON.stringify(billListArr));
            state.billList = billListArr;
           }
        },
        updateFilterStatus: (state, action) =>{
            state.filterStatus = action.payload;
        }, 
    },
});


export const { addBill, deleteBill, updateBill, updateFilterStatus } = billSlice.actions;
export default billSlice.reducer;