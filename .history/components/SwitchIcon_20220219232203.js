import React from 'react'

const SwitchIcon = () => {
  return (
   <div className="text-center -mt-2">
   <button
     className="w-fit"
     onClick={(event) => handleMenuItemClick(event, 1, outputToken[1])}
   >
     <Icon
       sx={{
         color: '#EC4899',
         fontSize: 16,
       }}
     />
   </button>
 </div>
  )
}

export default SwitchIcon