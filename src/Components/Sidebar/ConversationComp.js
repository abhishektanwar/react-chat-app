import React from 'react'
import {Avatar} from "@material-ui/core"
import './ConversationComp.css'
import { useAuth } from '../../Context/AuthContext'
import { useConversation } from '../../Context/ConversationContext'
// import useConversationData from '../../Hooks/useConversationData'
function ConversationComp({userId,docs,conversationId}) {
	const {showChat,setShowChat,setData,UserId,userName,selectedConversationIndex} = useConversation()
	console.log("st",showChat)
	console.log(UserId,userName,selectedConversationIndex,"selectedConversationIndex")
	// const {docs} = useFirestore	
	console.log(docs[0].contacts,"docs")
	const {currentUser} = useAuth()
	var userid
	if(userId[0]!==currentUser.uid){
		userid=userId[0]
	}else{
		userid=userId[1]
	}
	// const userid = userId[0]
	var name
	for(var i=0;i<docs[0].contacts.length;i++){
		if(docs[0].contacts[i].id===userid){
			name=docs[0].contacts[i].name
		}
	}

	function selectConversationIndex(conversationindex,userid,name){
		// console.log(id)
		setData(conversationindex,userid,name)
		setShowChat(true)
	}
	// console.log(userId,'userID')
	return (
		<div className="chats" onClick={()=>{selectConversationIndex(conversationId,userid,name)}}>
			<Avatar src="https://avatars.dicebear.com/api/human/1234.svg"/>
			<div className="channel__info">
				<h3>{userid}</h3>
				<p>{name}</p>

			</div>
			<hr style={{color:"#22303C",backgroundColor:"#22303C",height:"2px",opacity:"0.2"}} />
		</div>
	)
}

export default ConversationComp
