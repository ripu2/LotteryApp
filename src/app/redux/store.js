import {configureStore, applyMiddleware} from '@reduxjs/toolkit'
import globalReducer from './globalState'
import logger from 'redux-logger'


export const store = configureStore({
    reducer: {
        global: globalReducer
    },
    devTools: true,
})

export default store