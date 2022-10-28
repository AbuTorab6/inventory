import {configureStore} from '@reduxjs/toolkit'

import loaderState from '../stateSlice/loaderState'

export default configureStore(
    {
        reducer:{
            loaderState
        }
    }
)