import React,{ useState,useEffect } from 'react'
import {firestore} from "../Firebase/firebase"
import {useAuth} from '../Context/AuthContext'
const useConversationData = ({collection,con}) => {
	const [docs,setDocs] = useState([])
	const {currentUser} = useAuth()
	useEffect(()=>{
		const unsub = firestore.collection(collection)
			// .orderBy('createdAt','desc')
			.onSnapshot((snap)=>{
				let documents = []
				snap.forEach(doc => {
					if(con===doc.id)
					documents.push({
						...doc.data(),id:con
					})
				})
				setDocs(documents)
			})
			// cleanup function
			return () =>unsub()
	},[collection])
	return (
		{docs}
	)
}

export default useConversationData
