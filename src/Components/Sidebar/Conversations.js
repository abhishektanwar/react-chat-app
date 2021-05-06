import React,{useEffect,useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import firebase from 'firebase'
import useFirestore from '../../Hooks/useFireStore'
import useConversationData from '../../Hooks/useConversationData'
import {firestore} from '../../Firebase/firebase'
function Conversations() {
	const {docs,conversationId} = useFirestore('users')
	// console.log('docs',docs);
	// console.log('conversationId',conversationId,typeof conversationId);
	// const {dataFromConversation} = useConversationData('conversations',docs)
	const conversations=[]
	const [res,setRes] = useState([])
	const [conversationsWithRecipients,setConversationsWithRecipients]=useState([])
	const mainDoc=[]
	async function dataFetcher(){
		// conversations.push(docs[0].conversations)
		// console.log(docs[0].conversations)
		docs[0].conversations.forEach(conver => conversations.push(conver))
		console.log(conversations)
		setRes(conversations)
		let dt
		// dt = useConversationData('conversations',conversations[0])
		// conversations.forEach(con =>{
		// 	dt = useConversationData('conversations',con)
		// 	conversationsWithRecipients.push(dt)
		// })
		const data=[]
		conversations.forEach(convo=>{
			
			firestore.collection('conversations').onSnapshot((snap)=>{
				let documents=[]
				snap.forEach(doc=>{
					if(convo===doc.id){
						documents.push({
							...doc.data(),id:doc.id
						})
						console.log(doc.id)
					}
				})
				console.log('documents',documents)
				// setConversationsWithRecipients(documents)
				data.push(documents)
			})
		})
		setConversationsWithRecipients(data)

		// await 

		// console.log('conversationsWithRecipients',conversationsWithRecipients)
	}
	useEffect(()=>{
		// conversationsWithRecipients = useConversationData('conversations',conversations[0])
	},[res])
	return (
		<div className="sidebar_chatbody">
			{res && res.map(doc=>
			{ 
				// return doc.contacts.map(rt=>{
					{console.log(doc)}
				return(
				
				<h2>{doc}</h2>
				// <Chat name={rt.name} id={rt.id} />
			)
		})}

			<button onClick={dataFetcher}>clickme</button>
			
		</div>
	)
}

export default Conversations
