import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import './userlist.css'
import avater from '../assets/avater.png'
import { getAuth } from "firebase/auth";


const Userlist = () => {
    const auth = getAuth();
    const cUser = auth.currentUser;
    const db = getDatabase();
    let [user, setUser] = useState([])
    let [userList, setUserList] = useState([])

    useEffect(() => {
        onValue(ref(db, 'friendrequest/'), (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val().senderid + item.val().receiverid)
            })
            setUserList(arr)
        });
    }, [])

    useEffect(() => {
        onValue(ref(db, 'users/'), (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push({ ...item.val(), id: item.key })
            })
            setUser(arr)
            console.log(cUser);
        });
    }, [])

    let handleAdd = (item) => {
        set(ref(db, 'friendrequest/' + (cUser.uid + item.id)), {
            senderusername: cUser.displayName,
            senderid: cUser.uid,
            receiverusername: item.username,
            receiverid: item.id,
        });
    }

    let handleCancel = (item) => {
        remove(ref(db, 'friendrequest/' + (cUser.uid + item.id)));
    }
    return (
        <div className='userlist'>
            <h1>User List</h1>
            <div className='box'>
                {
                    user.map(item => (
                        <div className='uitem'>
                            <div className='user'>
                                <img src={avater} />
                                <div>
                                    <h3>{item.username}</h3>
                                    <p>{item.email}</p>
                                </div>
                            </div>
                            {userList.includes(cUser.uid + item.id)
                                ? <div><Button onClick={() => handleCancel(item)} variant="contained" href="#contained-buttons">Cancel</Button></div>

                                : <div><Button onClick={() => handleAdd(item)} variant="contained" href="#contained-buttons">Add</Button></div>
                            }

                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Userlist