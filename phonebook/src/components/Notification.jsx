import React from 'react'

const Notifications = ({notification}) => {
    if(notification == null) return null;
    
    let color;
    if(notification.type == 'successful') {
        color = 'green'
    } else color = 'red'

    const styleObject = {
        color: color,
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'lightgray'
    }


  return (
    <h2 style={styleObject}>{notification.message}</h2>
  )
}

export default Notifications