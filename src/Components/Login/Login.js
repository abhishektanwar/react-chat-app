import React,{useRef} from 'react'
import { Link,useHistory } from "react-router-dom"
import './Login.css'
const Login = () => {
	const history = useHistory()
	const emailRef = useRef()
	const passwordRef = useRef()

	async function handleLogin(e){
		e.preventDefault()
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
