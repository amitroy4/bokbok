import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './registration.css'
import { useNavigate, Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


let initial = {
    email: '',
    fullName: '',
    password: '',
    error: ''
}

const Registration = () => {
    const db = getDatabase();
    const auth = getAuth();
    const navigate = useNavigate();
    let [values, setValues] = useState(initial)
    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    let handleSignUp = () => {

        let { email, fullName, password } = values
        if (!email) {
            setValues({
                ...values,
                error: "Email den nai",
            })
            return
        }
        if (!fullName) {
            setValues({
                ...values,
                error: "Naam den nai",
            })
            return
        }
        if (!password) {
            setValues({
                ...values,
                error: "Password den nai",
            })
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                set(ref(db, 'users/' + user.user.uid), {
                    username: values.fullName,
                    email: email,
                });
                console.log(user);

                sendEmailVerification(auth.currentUser)
                    .then((user) => {
                        // Email verification sent!
                        // ...

                        navigate("/login")
                        console.log("Email gese");
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes("email-already-in-use")) {
                    setValues({
                        ...values,
                        error: "email-already-in-use",
                    })
                }
            });

    }
    return (
        <div className='reg'>
            <TextField onChange={handleValues} name='email' label="Email" variant="outlined" />
            {
                values.error.includes("Email") && <Alert severity="error">{values.error}</Alert>
            }
            {
                values.error.includes("already-in-use") && <Alert severity="error">{values.error}</Alert>
            }
            <TextField onChange={handleValues} name='fullName' label="Full Name" variant="outlined" />
            {
                values.error.includes("Naam") && <Alert severity="error">{values.error}</Alert>
            }
            <TextField onChange={handleValues} name='password' label="Password" variant="outlined" />
            {
                values.error.includes("Password") && <Alert severity="error">{values.error}</Alert>
            }
            <Alert severity="info">Already Have an Account! <Link to={'/login'}>Login</Link> </Alert>
            <Button onClick={handleSignUp} variant="contained">Sign Up</Button>
        </div>
    )
}

export default Registration