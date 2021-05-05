import React,{useRef} from 'react'
import { Link,useHistory } from "react-router-dom"
import { useAuth } from '../../Context/AuthContext'
import '../Login/Login.css'
const SignUp = () => {
	const history = useHistory()
	const emailRef = useRef()
	const passwordRef = useRef()
	const nameRef = useRef()
	const confirmPasswordRef = useRef()
	const {signup} = useAuth()

	// async function handleSubmit(e){
	// 	console.log("clicked")
	// 	e.preventDefault()
	// 	try{
	// 	await signup("gaamaaaaaa@a.com","123456","abhishek")
	// 	}
	// 	catch{
	// 	console.log("signup error")
	// 	}
	// }
	async function handleSignUp(e){
		e.preventDefault()

		if(passwordRef.current.value !== confirmPasswordRef.current.value){
			// return setError("Passwords do no match")
		}
		try{
			await signup(emailRef.current.value,passwordRef.current.value,nameRef.current.value)
			history.push('/')
		}
		catch{
			console.log("signup error")
		}


	}
	return (
		<div className="main_div">
			<div className="inner_div">
				<div className="image_element"></div>
				<form className="login_form" style={{marginTop:'30px'}}>
				<input 
						type="text"
						required
						ref = {nameRef}
						placeholder="Name"
					/>
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
					<input 
						type="password"
						required
						ref = {confirmPasswordRef}
						placeholder="Password"
					/>
					<button type="submit" onClick={(e)=>{handleSignUp(e)}}>Sign Up</button>
					<div id="signup-link">
						Already have an account? <Link to="/signin">Login</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp
