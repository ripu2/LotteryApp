import {configureStore} from '@reduxjs/toolkit'
import globalReducer from './globalState'

export const store = configureStore({
    reducer: {
        global: globalReducer
    },
    devTools: true
})

export default store