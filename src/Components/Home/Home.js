import React from 'react'
import { useAuth } from "../../Context/AuthContext"
import { auth,firestore } from "../../Firebase/firebase"
// import {}
const Home = () => {

	const {signup,logout,currentUser} = useAuth()
	async function handleSubmit(e){
		console.log("clicked")
		e.preventDefault()
		try{
		await signup("gaamaaaaaa@a.com","123456","abhishek")
		}
		catch{
		console.log("signup error")
		}
	}

	function handleLogout(e){
		e.preventDefault()
		logout()
	}
	return (
		<div>
			<button type="submit" onClick={handleSubmit}>Sign up</button>
			<button type="submit" onClick={handleLogout}>Logout</button>
			{currentUser.uid}
		</div>
	)
}

export default Home
