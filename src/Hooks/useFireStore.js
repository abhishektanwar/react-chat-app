import React,{ useState,useEffect } from 'react'
import {firestore} from "../Firebase/firebase"
import {useAuth} from '../Context/AuthContext'
const useFirestore = (collection) => {
	const [docs,setDocs] = useState([])
	const [conversationId,setConversationId] = useState([])
	const {currentUser} = useAuth()
	useEffect(()=>{
		// getting the conversations 
		const unsub = firestore.collection(collection)
			.orderBy('createdAt','desc')
			.onSnapshot((snap)=>{
				let documents = []
				snap.forEach(doc => {
					if(currentUser.uid===doc.id)
					documents.push({
						// for contacts
						...doc.data()
						// for conversations
						// ...doc.data().conversations
					})
					// console.log("doc.data()",doc.data().conversations)
				})
				setDocs(documents)

			})
			// let cv=[]
			
			
			// docs.forEach(doc=>{
			// 	Object.values(doc).forEach(d=>{
			// 		firestore.collection('conversations').onSnapshot((snap)=>{
			// 			let convs=[]
			// 			snap.forEach(con => {
			// 				// console.log("k",d);
			// 				if(con.id === d){
			// 					// let a = con.data()
			// 					// a.id=con.id
			// 					// console.log(a);
			// 					// cv.push(a)
			// 					// convs.push(con.id)
			// 					cv.push(con.id)
			// 					// console.log("p");
			// 				}
			// 			})
			// 			// setConversationId(convs)
			// 			// cv.push(convs)
			// 		})
			// 	})
			// 	setConversationId(cv)
			// })
			// docs.forEach(doc=>{
			// 	// doc.forEach(d=>{
			// 	// 	console.log(d)
			// 	// })
			// 	Object.values(doc).forEach(d=>{
			// 		console.log(d)
			// 	})
			// 	// console.log(Object.values(doc));
			// })
			
		
		
			// cleanup function
			return () =>unsub()
	},[collection])
	return (
		{docs}
	)
}

const test = () =>{

}



export default useFirestore
