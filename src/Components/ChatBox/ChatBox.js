import React,{useRef} from 'react'
import {Avatar,IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useConversation } from '../../Context/ConversationContext'
import {firestore} from '../../Firebase/firebase'
import {useAuth} from '../../Context/AuthContext'
import firebase from 'firebase'
import './ChatBox.css'
const ChatBox = () => {
	const {showChat,setShowChat,setData,UserId,userName,selectedConversationIndex} = useConversation()
	const textRef=useRef()
	const {currentUser} = useAuth()
	function handleSendMessage(e){
		e.preventDefault()
		console.log("sent clicked")
		firestore.collection('conversations').doc(selectedConversationIndex).update({
			messages:firebase.firestore.FieldValue.arrayUnion({text:textRef.current.value})

		})

		// console.log(textRef)
		
	}
	
	return (
		<div className="chatbox__body">
			<div className="header">
				<Avatar src="https://avatars.dicebear.com/api/human/123.svg" />
				<div className="channel__info">
					<h2>{userName}</h2>
					<p>chat description</p>
				</div>
				<IconButton>
					<EditIcon style={{color:"white"}}/>
				</IconButton>
				<IconButton>
					<MoreVert style={{color:"white"}}/>
				</IconButton>
			</div>
			<div className="chatbody">
				asfasf
			</div>
			<div className="chat__footer">
				<IconButton>
					<InsertEmoticonIcon style={{color:"white"}} />
				</IconButton>
				<form onSubmit={handleSendMessage}>
					<input type="text" placeholder="type your message here" ref={textRef} />
					<button type="submit" style={{backgroundColor:'grey'}}>Send</button>
				</form>
				<IconButton>
					<AddAPhotoIcon style={{color:"white"}} />
				</IconButton>

			</div>
		</div>

	)
}

export default ChatBox
