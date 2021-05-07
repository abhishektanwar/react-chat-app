import React from 'react'
import {Avatar} from "@material-ui/core"
import './ConversationComp.css'
import { useAuth } from '../../Context/AuthContext'
import { useConversation } from '../../Context/ConversationContext'
function GroupConversationComp({groupConvoDetails,docs}) {

	const {showChat,setShowChat,setGroupConversationData,selectedConversationIndex} = useConversation()
	console.log("groupConvoDetails",groupConvoDetails)
	const groupMemberDetails=[]
	// for(var i=0;i<docs[0].contacts.length;i++){
	// 	if(docs[0].contacts[i].id===userid){
	// 		name=docs[0].contacts[i].name
	// 	}
	// }
	function selectConversationIndex(conversationindex){
		// console.log(id)
		// for(var i=0;i<docs[0].contacts;i++){
		// 	for(var j=0;j<groupConvoDetails.recipients;j++){
		// 		// if(groupConvoDetails.recipients[j]===docs[0].contacts[i].id){
		// 		// 	groupMemberDetails.push({
		// 		// 		recipientId:"groupConvoDetails.recipients[j]",
		// 		// 		name:"docs[0].contacts[i].name"
		// 		// 	})
		// 		// }
		// 		// groupMemberDetails.push("asav")
		// 		console.log("t")
		// 	}
		// }
		var groupRecipients=groupConvoDetails.recipients
		
		Object.values(groupRecipients).forEach(reci=>{
			Object.values(docs[0].contacts).forEach(contact=>{
				// Object.values(group)
				// console.log("456446",contact)
				if(contact.id === reci){
					groupMemberDetails.push({
						recipientId:contact.id,
						name:contact.name
					})
				}
			})
		})
			setGroupConversationData(conversationindex,groupMemberDetails)
			setShowChat(true)
			console.log("99999",groupConvoDetails)
			console.log("11234",docs[0].contacts)
			console.log("member details", groupMemberDetails)

		
		// setGroupConversationData(conversationindex)
		// setShowChat(true)
		// console.log(groupConvoDetails)
		// console.log("11234",docs[0].contacts)
		// console.log("member details",groupMemberDetails)

	}
	return (
		<div className="chats" onClick={()=>{selectConversationIndex(groupConvoDetails.id)}}>
			<Avatar src="https://avatars.dicebear.com/api/human/1234.svg"/>
			<div className="channel__info">
				<h3>{groupConvoDetails.id}</h3>
				<p>Group</p>

			</div>
			<hr style={{color:"#22303C",backgroundColor:"#22303C",height:"2px",opacity:"0.2"}} />
		</div>
	)
}

export default GroupConversationComp
