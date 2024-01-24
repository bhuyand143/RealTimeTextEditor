import React, { useState } from 'react'
import Users from './Users'
import TextEditor from './TextEditor'

const UserEditor = (props) => {
    const [clients, setClients] = useState([]);

    const updateClient = (clientdata) => {
        setClients(clientdata);
    }
    return (
        <div className='row'>
            <div className='d-none d-lg-block col-lg-3 px-3 side-bar-border-col'>
               <div className='container mt-3'> <Users clients={clients} /></div>
            </div>
            <div className='col-lg-9 col-12 border border-start'>
                <TextEditor updateClient={updateClient} />
            </div>
        </div>
    )
}

export default UserEditor