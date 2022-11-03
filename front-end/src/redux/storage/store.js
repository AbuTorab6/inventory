import {configureStore} from '@reduxjs/toolkit'

import loaderState from '../stateSlice/loaderState'
import brandState from '../stateSlice/brandState'
import categoryState from '../stateSlice/categoryState'
import supplierState from '../stateSlice/supplierState'
import customerState from '../stateSlice/customerState'
import expenseTypeState from '../stateSlice/expenseTypeState'

export default configureStore(
    {
        reducer:{
            loaderState,
            brandState,
            categoryState,
            supplierState,
            customerState,
            expenseTypeState
        }
    }
)