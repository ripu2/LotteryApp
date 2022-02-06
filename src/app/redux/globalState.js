import { createSlice } from '@reduxjs/toolkit'
 
export const globalSlice = createSlice({
  name: 'globalState',
  initialState: {
    managerAccount: undefined,
    activeAccount: undefined,
    players: [],
    contractBalance: 0
  },
  reducers: {
    addManager: (state, action) => {
        console.log(`{action: ${addManager}, payload: ${action.payload}}`)
        state.managerAccount = action.payload
    },
    fetchActiveAccount: (state, action) => {
        console.log(`{action: ${fetchActiveAccount}, payload: ${action.payload}}`)
        state.activeAccount = action.payload
    },
    addParticipants: (state, action) => {
      console.log(`{action: ${addParticipants}, payload: ${action.payload}}`)
      state.players = action.payload
    },
    addContractBalance: (state, action) => {
      console.log(`{action: ${addContractBalance}, payload: ${action.payload}}`)
      state.contractBalance = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addManager, fetchActiveAccount,addParticipants, addContractBalance } = globalSlice.actions

const globalReducer = globalSlice.reducer

export default globalReducer