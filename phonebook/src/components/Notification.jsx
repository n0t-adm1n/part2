import React from 'react'

const Notifications = ({message}) => {

    const styleObject = {
        color: 'green',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'lightgray'
    }

    if(message == null) return null;

  return (
    <h2 style={styleObject}>{message}</h2>
  )
}

export default Notifications