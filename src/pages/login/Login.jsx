import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'
import Alert from '@mui/material/Alert';
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

let initial = {
    email: '',
    password: '',
    error: ''
}

const Login = () => {
    const notify = (msg) => toast.warn(msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const auth = getAuth();
    const navigate = useNavigate();
    let [values, setValues] = useState(initial)
    let handleValues = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }


    let handleLogIn = () => {

        let { email, password } = values
        if (!email) {
            setValues({
                ...values,
                error: "Email den nai",
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

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                if (user.user.emailVerified) {
                    navigate('/bokbok/home')
                    notify("Login Successful");
                } else {
                    notify("Please Verify your email");
                }
                // Signed in 
                // const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes("wrong-password")) {
                    setValues({
                        ...values,
                        error: "wrong-password",
                    })
                }
                console.log(errorCode);
            });

    }
    return (
        <div className='login'>
            <TextField onChange={handleValues} name='email' label="Gmail" variant="outlined" />
            {
                values.error.includes("Email") && <Alert severity="error">{values.error}</Alert>
            }
            {
                values.error.includes("already-in-use") && <Alert severity="error">{values.error}</Alert>
            }
            <TextField onChange={handleValues} name='password' label="Password" variant="outlined" />
            {
                values.error.includes("Password") && <Alert severity="error">{values.error}</Alert>
            }
            {
                values.error.includes("wrong") && <Alert severity="error">{values.error}</Alert>
            }
            <Alert severity="info">Don't Have an Account! <Link to={'/'}>Registration</Link> </Alert>
            <Button onClick={handleLogIn} variant="contained">Login</Button>
        </div>
    )
}

export default Login