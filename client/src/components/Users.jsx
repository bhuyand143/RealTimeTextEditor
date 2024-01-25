import React, { useEffect } from 'react'
import Avatar from 'react-avatar';

const Users = (props) => {
  const {clients}=props;

  return (
    <div className='container'>
        <h2 className='gradient-text mb-4'>Connected Users</h2>
        {clients && clients.map((item)=>(
            <div key={item.socketId} className='mt-2'>
                <Avatar name={`${item.username}`} size={50} round="14px" />
                <span className=""> {item.username}</span>
            </div>
        ))}
    </div>
  )
}

export default Users


