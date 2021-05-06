import React,{useState} from 'react'
import { useAuth } from "../../Context/AuthContext"
import { auth,firestore } from "../../Firebase/firebase"
import Sidebar from '../Sidebar/Sidebar'
import ChatBox from '../ChatBox/ChatBox'
import './home.css'
import Modal from '../../Components/Sidebar/Modal'
import { ConversationProvider } from '../../Context/ConversationContext';

// import {}
const Home = () => {
	const [showChatBox,setShowChatBox] = useState(false)
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
	const closeModalHandler = () => {
		console.log("ckis")
		setShow(false)
	}
	const [show,setShow] = useState(false)
	const [modalName,setModalName] = useState('')
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
		<ConversationProvider>
		<div className="app__body">
			{/* <div>
				{show ? <div className="backdrop"></div>:null}
				<button onClick={()=>{setShow(true)}}>Open Modal</button>
				<Modal show={show} closeModalHandler={closeModalHandler}/>
			</div> */}
			{/* <button type="submit" onClick={handleSubmit}>Sign up</button>
			<button type="submit" onClick={handleLogout}>Logout</button>
			{currentUser.uid}
			<button type="submit" onClick={handleshowData}>Show data</button> */}
			<Sidebar setShow={setShow} setModalName={setModalName} />
			{/* <ChatBox /> */}
			{show && 
			<Modal modalName={modalName} closeModalHandler={closeModalHandler} setShow={setShow} setModalName={setModalName} />}
		

		</div>
		</ConversationProvider>
	)
}

export default Home
