import React, { useContext, useEffect, useState } from 'react'
import { auth,firestore } from "../Firebase/firebase"
import firebase from 'firebase'
const ConversationContext = React.createContext()

export function useConversation(){
	return useContext(ConversationContext)
}
export function ConversationProvider({children}) {
	const [showChat,setShowChat] = useState()
	const [UserId,setUserId] = useState('')
	const [userName,setUserName] = useState('')
	const [selectedConversationIndex,setSelectedConversationIndex] = useState('')
	const [isGroupChat,setIsGroupChat] = useState(false)
	const [groupMemberDetails,setGroupMemberDetails] = useState([])
	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(user => {
	// 		setCurrentUser(user)
	// 		setLoading(false)
	// 	})
	// 	return unsubscribe
	// },[])
	function setGroupConversationData(conversationIndex,groupMemberDetails){
		setIsGroupChat(true)
		setSelectedConversationIndex(conversationIndex)
		setGroupMemberDetails(groupMemberDetails)
	}

	function setData(conversationIndex,userid,username){
		setIsGroupChat(false)
		setUserId(userid)
		setUserName(username)
		setSelectedConversationIndex(conversationIndex)
	}

	const value = {
		isGroupChat,
		showChat,
		UserId,
		userName,
		selectedConversationIndex,
		setData,
		setShowChat,
		setIsGroupChat,
		setGroupConversationData
	}

	return (
		<ConversationContext.Provider value={value}>
			{children}
		</ConversationContext.Provider>
	)
}
