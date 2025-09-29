import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      //add to pastes  
      const paste= action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      alert("Paste created Successfully")
    },
    updateToPastes: (state,action) => {
      //update to pastes
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        alert("Paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
        //reset all pastes
        state.pastes=[];
        localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
        //remove a paste
        const pasteId = action.payload;
        const index = state.pastes.findIndex((item) => item._id === pasteId);

        if (index >= 0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            alert("Paste Deleted");
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer