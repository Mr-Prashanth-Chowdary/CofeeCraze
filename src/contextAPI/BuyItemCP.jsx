import React, { useContext, useEffect, useState } from 'react'
import BuyItemContext from './BuyItem'


function BuyItemCP({children}) {
    const [buyItem,setBuyItem] = useState(null);

  return (
    <BuyItemContext.Provider value={{buyItem,setBuyItem}}>
        {children}
    </BuyItemContext.Provider>
  )
}

export default BuyItemCP