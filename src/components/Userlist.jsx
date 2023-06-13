import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";

const Userlist = () => {
    const db = getDatabase();
    let [user, setUser] = useState([])
    useEffect(() => {
        onValue(ref(db, 'users/'), (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                arr.push(item.val())
            })
            setUser(arr)
        });
    }, [])
    return (
        <div>
            <h1>User List</h1>
            {
                user.map(item => (
                    <div>{item.username}</div>
                ))
            }
        </div>

    )
}

export default Userlist