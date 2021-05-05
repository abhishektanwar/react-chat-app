import React,{useRef} from 'react'
import { Link,useHistory } from "react-router-dom"
import { useAuth } from '../../Context/AuthContext'
import './Login.css'
import { auth,firestore } from "../../Firebase/firebase"
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from 'firebase'
const Login = () => {
	const history = useHistory()
	const emailRef = useRef()
	const passwordRef = useRef()
	const {login,currentUser} = useAuth()
	async function handleLogin(e){
		e.preventDefault()
		try{
			// setError('')
			// setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			// await console.log(login(emailRef.current.value, passwordRef.current.value))
			
			// console.log(data)
			// firebase.firestore
			history.push('/home')
		}
		catch{
			// setError('Failed to log in')
		}
	}
	return (
		<div className="main_div">
			<div className="inner_div">
				<div className="image_element"></div>
				<form className="login_form">
					<input 
						type="email"
						required
						ref = {emailRef}
						placeholder="Email"
					/>
					<input 
						type="password"
						required
						ref = {passwordRef}
						placeholder="Password"
					/>
					<button type="submit" onClick={(e)=>{handleLogin(e)}}>Sign In</button>
					<div id="signup-link">
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
