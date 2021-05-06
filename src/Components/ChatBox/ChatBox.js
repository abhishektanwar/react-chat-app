import React from 'react'
import {Avatar,IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import MoreVert from '@material-ui/icons/MoreVert';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import './ChatBox.css'
const ChatBox = () => {
	return (
		<div className="chatbox__body">
			<div className="header">
				<Avatar src="https://avatars.dicebear.com/api/human/123.svg" />
				<div className="channel__info">
					<h2>chat name</h2>
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
				<form>
					<input type="text" placeholder="type your message here"  />
					<button>Submit</button>
				</form>
				<IconButton>
					<AddAPhotoIcon style={{color:"white"}} />
				</IconButton>

			</div>
		</div>

	)
}

export default ChatBox
