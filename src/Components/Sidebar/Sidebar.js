import React,{useState} from 'react'
import './Sidebar.css'
import {Avatar,IconButton} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import SidebarChat from './SidebarChat'
import { useAuth } from '../../Context/AuthContext'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'
const Sidebar = () => {
	const {currentUser} = useAuth()
	const [activeKey,setActiveKey] = useState(CONVERSATIONS_KEY)

	function handleActiveKey(key){
		setActiveKey(key)
	}
	return (
		<div className="sidebar__component">
			<div className="header">
				<Avatar src="https://avatars.dicebear.com/api/human/1234.svg" />
				<div className="username"><><h4>User Name</h4></></div>
				<p><span className="statusColor"></span>online</p>
				<IconButton>
					<AddIcon style={{color:"pink",marginTop:"-15px"}}/>
					
				</IconButton>
				<IconButton>
                    <ExitToAppIcon style={{color:"pink",marginTop:"-15px"}} />
                </IconButton>
			</div>
			<div className="conversation_button">
				<button className={`conversation__contact_buttons ${activeKey === CONVERSATIONS_KEY ? 'activeKey': '' } `} onClick={()=>handleActiveKey(CONVERSATIONS_KEY)}>Conversations</button>
				<button className={`conversation__contact_buttons ${activeKey === CONTACTS_KEY ? 'activeKey': '' } `} onClick={()=>handleActiveKey(CONTACTS_KEY)}>Contacts</button>
			</div>
			{activeKey===CONVERSATIONS_KEY ? <SidebarChat />:<SidebarChat />}
			<div>
				Your Id: {currentUser.uid}
			</div>
			<div className="new__converwsation__contact">
				<button>New {activeKey===CONVERSATIONS_KEY ? 'Conversation':'Contact'}</button>
			</div>
		</div>
	)
}

export default Sidebar
