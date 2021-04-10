import React from 'react'
import { AppProps } from './type'

const AppContext = React.createContext<AppProps>({
  modalOpen: false,
  toggleModal: () => ({})
})

export default AppContext
