import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

const Home = (props) => {
    let navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [fileHistory, setFileHistory] = useState([]);
    const [copied, setCopied] = useState('')
    const {isLoggedin}=props;
    const host = import.meta.env.VITE_APP_SERVER;

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }
    const handleClick = async (e) => {
        if (searchText === '') {
            alert('please enter a id or click below to create a new one!');
        }
        else {
            const url = `${host}/api/fetchfile/${searchText}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json()
            if (json.success) {
                navigate(`/documents/${searchText}`)
            }
            else {
                alert('Please enter a valid document id');
            }
        }
    }
    const handleCreate = () => {
        navigate(`/documents/${uuidV4()}`)
    }

    const handleDelete = async (fileURL) => {
            const url = `${host}/api/deletefile/${fileURL}`
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json()
            if(json.success)
            {
                getfiles();
            }
            alert(json.message);
        }
    

    const getfiles = async () => {
        const url = `${host}/api/fetchfiles`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        if (json.files) {
            const t = json.files;
            t.reverse();
            setFileHistory(t);
        }
    }

    useEffect(() => {
        if (isLoggedin) {
            getfiles();
        }
        else {
            alert('Please Login to Continue!', 'danger')
        }
    }, [])

    return (
        <div className='container'>
            <div className='mt-5 text-end'>
                <button onClick={handleCreate} className='btn btn-success mx-1' role="button">Create <i className="fa-solid fa-file-circle-plus"></i></button>
            </div>
            <div className='d-flex my-4 mt-5'>
                <input type="search" className='form-control me-2' placeholder='Please give a valid document id' name='searchText' value={searchText} onChange={handleSearch} autoFocus required />
            </div>
            <div className='text-center mt-2'>
                <button className='btn btn-primary mx-1' role="button" onClick={handleClick}> Open <i className="fa-solid fa-file-pen"></i></button>
            </div>
            <div className="d-flex flex-column gap-1 max-height-60 overflow-y-auto">
                <h1 className='gradient-text'>Your Files</h1>
                <div className="container">
                    <div className="row">
                        {fileHistory && fileHistory.map((item) => {
                            return (
                                <div key={item._id} onClick={() => { setSearchText(item.doc_id) }} className='link_card col-3 mt-2 mx-5'>
                                    <p className='flex-1 font-satoshi text-primary font-weight-medium text-sm text-truncate'>
                                        {item.doc_id}
                                    </p>
                                    <div className=" flex-end" >
                                        <span className=' ' onClick={() => { handleCopy(item.doc_id) }}>{copied === item.doc_id ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa-solid fa-copy"></i>}</span>
                                        <span className=' ' onClick={() => { handleDelete(item.doc_id) }}><i class="fa fa-trash" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home



