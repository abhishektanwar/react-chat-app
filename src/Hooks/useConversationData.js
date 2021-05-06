import React,{ useState,useEffect } from 'react'
import {firestore} from "../Firebase/firebase"
import {useAuth} from '../Context/AuthContext'
const useConversationData = ({collection,userDocs}) => {
	const [docs,setDocs] = useState([])
	const {currentUser} = useAuth()
	const conversations=[]
	useEffect(()=>{
		// userDocs[0].conversations.forEach(conver => conversations.push(conver))
		// console.log("conversations in hook",conversations);
		console.log(userDocs);
		// const unsub = firestore.collection(collection)
		// 	// .orderBy('createdAt','desc')
		// 	.onSnapshot((snap)=>{
		// 		let documents = []
		// 		snap.forEach(doc => {
		// 			if(con===doc.id)
		// 			documents.push({
		// 				...doc.data(),id:con
		// 			})
		// 		})
		// 		setDocs(documents)
		// 	})
		// 	// cleanup function
		// 	return () =>unsub()
	},[collection,userDocs])
	return (
		{docs}
	)
}

export default useConversationData
