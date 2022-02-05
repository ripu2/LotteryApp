import { createSlice } from '@reduxjs/toolkit'
 
export const globalSlice = createSlice({
  name: 'globalState',
  initialState: {
    managerAccount: undefined,
    activeAccount: undefined
  },
  reducers: {
    addManager: (state, action) => {
        console.log(`{action: ${addManager}, payload: ${action.payload}}`)
        state.managerAccount = action.payload
    },
    fetchActiveAccount: (state, action) => {
        console.log(`{action: ${fetchActiveAccount}, payload: ${action.payload}}`)
        state.activeAccount = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addManager, fetchActiveAccount } = globalSlice.actions

const globalReducer = globalSlice.reducer

export default globalReducer