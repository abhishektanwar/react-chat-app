import React,{useState} from 'react'
import './Sidebar.css'
import {Avatar,IconButton} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import SidebarChat from './SidebarChat'
import { useAuth } from '../../Context/AuthContext'
// import {Modal} from 'react-bootstrap'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import Modal from './Modal'
import Conversations from './Conversations'
import Contacts from './Contacts'
const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'
const Sidebar = ({setShow,setModalName}) => {
	// const [show,setShow] = useState(false)
	const {currentUser,logout} = useAuth()
	const [activeKey,setActiveKey] = useState(CONTACTS_KEY)
	const [modalOpen,setModalOpen] = useState(false)
	function handleActiveKey(key){
		setActiveKey(key)
	}
	function handleLogout(e){
		// e.preventDefault()
		logout()
	}
	function handleModalShow(){
		setShow(true)
		setModalName(activeKey)
	}

	const closeModalHandler = () => {
		setShow(false)
		setModalName('')
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
			{activeKey===CONTACTS_KEY ? <Contacts />:<Conversations />}
			<div className="userId__display">
			<button type="submit" onClick={handleLogout}>Logout</button>
				Your Id: {currentUser.uid}
			</div>
			<div className="new__conversation__contact">
				<button onClick={handleModalShow}>New {activeKey===CONTACTS_KEY ? 'Contact':'Conversation'}</button>
			</div>
			{/* <Modal show={modalOpen} onHide={closeModal}>
				{
					activeKey === CONVERSATIONS_KEY ? 
						<NewConversationModal closeModal={closeModal}/> : 
						<NewContactModal closeModal={closeModal}/>
				}
			</Modal> */}
			
			
		</div>
	)
}

export default Sidebar






// old : converawtion intial active key
// import React,{useState} from 'react'
// import './Sidebar.css'
// import {Avatar,IconButton} from "@material-ui/core"
// import AddIcon from "@material-ui/icons/Add"
// import ExitToAppIcon from "@material-ui/icons/ExitToApp"
// import SidebarChat from './SidebarChat'
// import { useAuth } from '../../Context/AuthContext'
// // import {Modal} from 'react-bootstrap'
// import NewContactModal from './NewContactModal'
// import NewConversationModal from './NewConversationModal'
// import Modal from './Modal'
// import Conversations from './Conversations'
// import Contacts from './Contacts'
// const CONVERSATIONS_KEY = 'conversations'
// const CONTACTS_KEY = 'contacts'
// const Sidebar = ({setShow,setModalName}) => {
// 	// const [show,setShow] = useState(false)
// 	const {currentUser,logout} = useAuth()
// 	const [activeKey,setActiveKey] = useState(CONVERSATIONS_KEY)
// 	const [modalOpen,setModalOpen] = useState(false)
// 	function handleActiveKey(key){
// 		setActiveKey(key)
// 	}
// 	function handleLogout(e){
// 		// e.preventDefault()
// 		logout()
// 	}
// 	function handleModalShow(){
// 		setShow(true)
// 		setModalName(activeKey)
// 	}

// 	const closeModalHandler = () => {
// 		setShow(false)
// 		setModalName('')
// 	}
// 	return (
// 		<div className="sidebar__component">
// 			<div className="header">
// 				<Avatar src="https://avatars.dicebear.com/api/human/1234.svg" />
// 				<div className="username"><><h4>User Name</h4></></div>
// 				<p><span className="statusColor"></span>online</p>
// 				<IconButton>
// 					<AddIcon style={{color:"pink",marginTop:"-15px"}}/>
					
// 				</IconButton>
// 				<IconButton>
//                     <ExitToAppIcon style={{color:"pink",marginTop:"-15px"}} />
//                 </IconButton>
// 			</div>
// 			<div className="conversation_button">
// 				<button className={`conversation__contact_buttons ${activeKey === CONVERSATIONS_KEY ? 'activeKey': '' } `} onClick={()=>handleActiveKey(CONVERSATIONS_KEY)}>Conversations</button>
// 				<button className={`conversation__contact_buttons ${activeKey === CONTACTS_KEY ? 'activeKey': '' } `} onClick={()=>handleActiveKey(CONTACTS_KEY)}>Contacts</button>
// 			</div>
// 			{activeKey===CONVERSATIONS_KEY ? <Conversations />:<Contacts />}
// 			<div className="userId__display">
// 			<button type="submit" onClick={handleLogout}>Logout</button>
// 				Your Id: {currentUser.uid}
// 			</div>
// 			<div className="new__conversation__contact">
// 				<button onClick={handleModalShow}>New {activeKey===CONVERSATIONS_KEY ? 'Conversation':'Contact'}</button>
// 			</div>
// 			{/* <Modal show={modalOpen} onHide={closeModal}>
// 				{
// 					activeKey === CONVERSATIONS_KEY ? 
// 						<NewConversationModal closeModal={closeModal}/> : 
// 						<NewContactModal closeModal={closeModal}/>
// 				}
// 			</Modal> */}
			
			
// 		</div>
// 	)
// }

// export default Sidebar
