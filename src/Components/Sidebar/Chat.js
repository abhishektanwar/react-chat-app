import React from 'react'
import {Avatar} from '@material-ui/core'
import './Chat.css'
function Chat({name,id}) {
	return (
		<div>
			<div className="chats">
				<Avatar src="https://avatars.dicebear.com/api/human/1234.svg"/>
				<div className="channel__info">
					<h3>{name}</h3>
					<p>{id}</p>
				</div>
			</div>
			<hr style={{color:"#22303C",backgroundColor:"#22303C",height:"2px",opacity:"0.2"}} />
		</div>
	)
}

export default Chat
