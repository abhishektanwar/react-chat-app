import React from 'react'
import { useAuth } from "../../Context/AuthContext"
import { auth,firestore } from "../../Firebase/firebase"
import Sidebar from '../Sidebar/Sidebar'
import ChatBox from '../ChatBox/ChatBox'
import './home.css'
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
	const docs = []
	async function handleshowData(){
		firestore.collection(`users`).onSnapshot((snap)=>{
			console.log(snap)
			snap.forEach(doc=>{
				if(doc.id==currentUser.uid){
					docs.push(doc.data())
				}
				
			})
		})
		// console.log(t)
		console.log(docs)
		// console.log(s)
	}
	
	return (
		<div className="app__body">
			{/* <button type="submit" onClick={handleSubmit}>Sign up</button>
			<button type="submit" onClick={handleLogout}>Logout</button>
			{currentUser.uid}
			<button type="submit" onClick={handleshowData}>Show data</button> */}
			<Sidebar />
			<ChatBox />
		</div>
	)
}

export default Home
