import React,{useEffect,useState} from 'react'
import {useAuth} from '../../Context/AuthContext'
import firebase from 'firebase'
import useFirestore from '../../Hooks/useFireStore'
import useConversationData from '../../Hooks/useConversationData'
import {firestore} from '../../Firebase/firebase'
import ConversationComp from './ConversationComp'
import GroupConversationComp from './GroupConversationComp'
function Conversations() {
	const {docs,conversationId} = useFirestore('users')
	// console.log('docs',docs);
	// console.log('conversationId',conversationId,typeof conversationId);
	// const {dataFromConversation} = useConversationData('conversations',docs)
	const conversations=[]
	const conversationArray=[]
	const [loading,setLoading] = useState(true)
	// res is conversation ids of logged in user

	const [res,setRes] = useState([])
	const [conversationsWithRecipients,setConversationsWithRecipients]=useState([])
	const mainDoc=[]
	const [clickState,setClickState]=useState(false)
	function handleConversationClick(){
		console.log("a")
	}
	const data=[]
	function dataFetcher(){
		// conversations.push(docs[0].conversations)
		// console.log(docs[0].conversations)
		// taking conversation ids of loggedin user and putting all
		// conversation in setRes/conversation
		docs[0].conversations.forEach(conver => conversations.push(conver))
		console.log(conversations)
		setRes(conversations)
		let dt
		// dt = useConversationData('conversations',conversations[0])
		// conversations.forEach(con =>{
		// 	dt = useConversationData('conversations',con)
		// 	conversationsWithRecipients.push(dt)
		// })
		
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
				console.log("data",data);
			})
		})
		setConversationsWithRecipients(data)
		
		console.log(conversationsWithRecipients);
		setTimeout(function(){
			console.log("a")
			
			// for(var i=0;i<conversationsWithRecipients.length;i++){
			// 	conversationArray.push({rec:conversationsWithRecipients[i],id:res[i]})
			// }
			// console.log(conversationArray);
			// console.log(conversationsWithRecipients);
			setClickState(true)
		},1000)
		// setClickState(true)
		// await 

		// console.log('conversationsWithRecipients',conversationsWithRecipients)
	}
	useEffect(()=>{
		// conversationsWithRecipients = useConversationData('conversations',conversations[0])
		conversationsWithRecipients && 
			conversationsWithRecipients.forEach(conv=>{
				conv.forEach((con)=>{
					console.log(con.recipients.length);
				})
			})
		
	},[res,conversationsWithRecipients])

	useEffect(()=>{
		setTimeout(()=>{
			dataFetcher()
		},4000)
	},[])
	return (
		<div className="sidebar_chatbody">
			{/* {console.log(Object.values(conversationsWithRecipients),"conversationsWithRecipients")}
			{Object.values(conversationsWithRecipients).forEach(rec=>{
				console.log(rec,"hjkl")
			})} */}
			{/* {conversationsWithRecipients && 
				conversationsWithRecipients.forEach(conv=>{
					conv.forEach((con)=>{
						console.log(con.recipients.length);
					})
				})
			} */}
			{clickState && 
				conversationsWithRecipients.map(convRecepient =>{
					console.log(convRecepient[0])
					if(convRecepient[0].recipients.length===2){
						return(
							// individual conversation
							<ConversationComp userId={convRecepient[0].recipients} docs={docs} conversationId={convRecepient[0].id}/>
						)
					}else{
						// group conversation
						return(
							// {console.log()}
							// <h2 style={{color:'white'}}>{convRecepient[0].id } group</h2>
							<h2><GroupConversationComp groupConvoDetails={convRecepient[0]} docs={docs}/></h2>
						)
					}
					
				})
			}
			{/* {data && console.log(data)} */}
			{/* {res && res.map(doc=>
			{ 
				// return doc.contacts.map(rt=>{
					// id of each conversation of logged in user
					// {console.log(doc)}
					
				return(
				
				<h2 onClick={handleConversationClick}>{doc}</h2>
				// <Chat name={rt.name} id={rt.id} />
			)
		})} */}

			<button id="btnn" onClick={dataFetcher}>clickme</button>
			
		</div>
	)
}

export default Conversations
