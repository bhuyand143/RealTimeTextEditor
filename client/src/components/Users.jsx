import React from 'react'
import Avatar from 'react-avatar';

const Users = (props) => {
  const {clients}=props
  return (
    <div>
        {clients && clients.map((item)=>(
            <div key={item.socketId}>
                <Avatar name={`${item.username}`} size={50} round="14px" />
                <span className="mt-3">{item.username}</span>
            </div>
        ))}
    </div>
  )
}

export default Users


