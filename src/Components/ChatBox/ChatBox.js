import React,{useRef,useState,useEffect} from 'react'
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
import useFirestore from '../../Hooks/useFireStore'
const ChatBox = () => {
	let msgArr=[]
	const {isGroupChat,showChat,setShowChat,setData,UserId,userName,selectedConversationIndex,groupMemberDetails} = useConversation()
	const {docs} = useFirestore('users')
	const textRef=useRef()
	const {currentUser} = useAuth()
	const [messages,setMessages] = useState([])
	const [isClicked,setIsClicked] = useState(0)
	// console.log("89890",docs[0].contacts)
	
	function handleSendMessage(e){
		e.preventDefault()
		console.log("sent clicked")
		// let sentAt = firebase.firestore.FieldValue.serverTimestamp()
		firestore.collection('conversations').doc(selectedConversationIndex).update({
			messages:firebase.firestore.FieldValue.arrayUnion({
				text:textRef.current.value,
				sender:currentUser.uid,
				sentAt:firebase.firestore.Timestamp.now()
			})

		})
		// firestore.collection('conversations').doc(selectedConversationIndex).onSnapshot(snap=>{
		// 	console.log("snap",snap.data().messages.length)

		// })
		textRef.current.value=''

		// console.log(textRef)
		
	}

	useEffect(()=>{
		// let msgArr=[]
		firestore.collection('conversations').doc(selectedConversationIndex).onSnapshot(snap=>{
			console.log("message data",snap.data().messages)
			msgArr = snap.data().messages.map(doc=>{
				return {msg:doc,messageID:doc.id}
			})
			// snap.data().messages.map(messageObj=>{
			// 	setMessages([...messages,{msg:messageObj,id:messageObj.id}])
			// })
		})
		setTimeout(() => {
			console.log("message arr",msgArr)
			setTimeout(()=>{
				setMessages(msgArr)
			},1000)
			setMessages(msgArr)
			// console.log("messages state",messages);
		}, 1000);
	},[selectedConversationIndex,isClicked])

	useEffect(()=>{
		console.log("messages state",messages)
	},[messages])

	function sendClicked(){
		console.log("send clicked")
		setIsClicked(isClicked+1)
		// setIsClicked(()=>{prevIsClicked+1}))
	}

	function returnsUserNameOrIdInGroupChat(id){
		for(var i=0;i<docs[0].contacts;i++){
			if(id === docs[0].contacts[i].id){
				console.log("456987")
				return docs[0].contacts[i].name
			}
		}
		return false
	}
	return (
		<div className="chatbox__body">
			<div className="header">
				<Avatar src="https://avatars.dicebear.com/api/human/123.svg" />
				<div className="channel__info">
					{isGroupChat ? <h2>Group chat</h2> : 
						<>
						<h2>{userName}</h2>
						<p>chat description</p></>
					}

				</div>
				<IconButton>
					<EditIcon style={{color:"white"}}/>
				</IconButton>
				<IconButton>
					<MoreVert style={{color:"white"}}/>
				</IconButton>
			</div>
			<div className="chatbody">
				
						{/* <div className="main_chat_body">
							{messages && messages.map((msg,index)=>{
								// console.log(msg.msg.text)
								// return <h2>{msg.msg.text}</h2>
								console.log(msg.msg.sender)
								
								return (
									<div className={`chat__main__div`}  key={index}>
										<div >
											<div className={`${msg.msg.sender === currentUser.uid ? 'loggedin_sender' : 'other_sender'}`}>{msg.msg.text}</div>
										</div>
										<div>
											{msg.msg.sender === currentUser.uid ? 
												<p>You</p>
												:
												<p>{userName}</p>
											}
										</div>
									</div>
								)
							})}
						</div> */}
						{/* {!loading && } */}
							<div className="d-flex flex-column flex-grow-1">
							<div className="flex-grow-1 overflow-auto">
								<div className="d-flex flex-column align-items-start justify-content-end px-3">
									{isGroupChat ? 
									
									<>
										{messages && messages.map((msg,index)=>{
										// console.log(msg.msg.text)
										// return <h2>{msg.msg.text}</h2>
										console.log(msg.msg.sender)
										
										return (
											<div className={`my-1 d-flex flex-column ${msg.msg.sender===currentUser.uid ? 'align-self-end':''}`}  key={index}>
												<div className={`rounded px-2 py-1 ${msg.msg.sender===currentUser.uid ? `loggedin_sender text-white` : `other_sender`}` }>
													{msg.msg.text}
												</div>
												<div className={` sender-color ${msg.msg.sender === currentUser.uid ? `text-right`:``}`}>
													{msg.msg.sender === currentUser.uid ? 
														<p>You</p>
														: 
														<p>
														{returnsUserNameOrIdInGroupChat(msg.msg.sender) === false ? msg.msg.sender: returnsUserNameOrIdInGroupChat(msg.msg.sender)}</p>
													}
												</div>
											</div>
										)
										})}
									</>
									: 
								<> 
								{messages && messages.map((msg,index)=>{
									// console.log(msg.msg.text)
									// return <h2>{msg.msg.text}</h2>
									console.log(msg.msg.sender)
									
									return (
										<div className={`my-1 d-flex flex-column ${msg.msg.sender===currentUser.uid ? 'align-self-end':''}`}  key={index}>
											<div className={`rounded px-2 py-1 ${msg.msg.sender===currentUser.uid ? `loggedin_sender text-white` : `other_sender`}` }>
												{msg.msg.text}
											</div>
											<div className={` sender-color ${msg.msg.sender === currentUser.uid ? `text-right`:``}`}>
												{msg.msg.sender === currentUser.uid ? 
													<p>You</p>
													:
													<p>
													{userName}
													</p>
												}
											</div>
										</div>
									)
								})}
								</>
								}
								
							</div>
						</div>			
										</div>
						</div>
			
			<div className="chat__footer">
				<IconButton>
					<InsertEmoticonIcon style={{color:"white"}} />
				</IconButton>
				<form onSubmit={handleSendMessage}>
					<input type="text" placeholder="type your message here" ref={textRef} />
					<button type="submit" style={{backgroundColor:'grey'}} onClick={sendClicked}>Send</button>
				</form>
				<IconButton>
					<AddAPhotoIcon style={{color:"white"}} />
				</IconButton>

			</div>
		</div>

	)
}

export default ChatBox
