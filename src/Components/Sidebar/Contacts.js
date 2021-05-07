import React,{useEffect,useState} from 'react'
import { auth,firestore } from '../../Firebase/firebase'
import { useAuth } from '../../Context/AuthContext'
import useFirestore from '../../Hooks/useFireStore'
import Chat from './Chat'
function Contacts() {
	const { currentUser } = useAuth()
	const list = []
	const {docs} = useFirestore('users')
	const [contacts,setContacts] = useState([])


	async function handleClick(){
		firestore.collection(`users`).onSnapshot((snap)=>{
			// console.log(snap)
			snap.forEach(doc=>{
				if(doc.id==currentUser.uid){
					list.push(doc.data())
				}
				
			})
		})
		// console.log(t)
		console.log(list)
		// console.log(s)
	}
	
	// async function handleClick(){
	// 	await firestore.collection('users').doc(currentUser.uid).onSnapshot((snap)=>{
	// 		snap.forEach(doc=>{
	// 			list.push(doc.data())
	// 		})
			
	// 	})
	// 	console.log(list)
	// }
	// useEffect(()=>{
	// 	firestore.collection(`users`).onSnapshot((snap)=>{
	// 		// console.log(snap)
	// 		snap.forEach(doc=>{
	// 			if(doc.id==currentUser.uid){
	// 				list.push(doc.data())
	// 			}
				
	// 		})
	// 		setContacts(list)
	// 	})
	// 	// setContacts(list)
	// },[contacts])
	// useEffect(()=>{

	// },[docs])
	return (
		<div className="sidebar_chatbody">
			{/* {currentUser.uid} */}
		{/* {list} */}
		{/* {contacts} */}
		{docs && docs.map(doc=>
			{ return doc.contacts.map(rt=>{
			return(
				// <h2>{rt.name}</h2>
				<Chat name={rt.name} id={rt.id} />
			)
		})}

		)}
		{console.log(docs)}
			{/* <button onClick={handleClick}>Click</button> */}
		</div>
	)
}

export default Contacts
