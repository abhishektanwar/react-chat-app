// import React from 'react'
import "./Modal.css"
// function Modal({show,closeModalHandler}) {
// 	return (
// 		<div className="modal-wrapper"
// 			style={{
// 				opacity:show ? '1':'0'
// 				// z-index:999
// 			}}
// 		>
// 			<div className="modal-header">
// 				<p>Welcome to our site</p>
// 				<span className="close-modal-btn">x</span>
// 			</div>
// 			<div className="modal-content">
// 				<div className="modal-body">
// 					<h4>Modal</h4>
// 					<p>lorem loremloremloremloremlorem loremlorem lorem loremloremloremloremlorem loremlorem</p>

// 				</div>
// 				<div className="modal-footer">
// 					<button className="btn-cancel" onClick={closeModalHandler}>Close</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default Modal


import React,{useRef,useState} from 'react'
// import { motion } from 'framer-motion'
// import { auth,firestore } from "../../Firebase/firebase"
import firebase from 'firebase'
// import {useAuth} from '../../Context/AuthContext'
import { auth,firestore } from '../../Firebase/firebase'
import { useAuth } from '../../Context/AuthContext'
import useFirestore from '../../Hooks/useFireStore'

const Modal = ({closeModalHandler,setShow,modalName}) => {
	const idRef=useRef()
	const nameRef = useRef()
	const {currentUser} = useAuth()
	const {docs} = useFirestore('users')
	const [selectedContactIds,setSelectedContactIds] = useState([])
	const handleClick = (e) =>{
		if(e.target.classList.contains('backdrop')){
			setShow(false)
		}
	}

	function handleCheckboxChange(contactId){
		setSelectedContactIds(prevSelectedContactIds => {
			if(prevSelectedContactIds.includes(contactId)){
				return prevSelectedContactIds.filter(prevId => {
					return contactId !== prevId
				})
			}else{
				return [...prevSelectedContactIds,contactId]
			}
		})
		console.log(selectedContactIds)
	}

	function createConversation(recipients){
		console.log("recipien",recipients)
		firestore.collection('conversations').add({
			// contactId:contactId
		})
		.then(res=>{
			console.log("res.id",res.id);
			firestore.collection('conversations').doc(res.id).set({
				recipients:recipients,
				messages:[]
			})
			// firestore.collection('users').doc(currentUser.uid).update({
			// 	conversations:firebase.firestore.FieldValue.arrayUnion(res.id)

			// })
			console.log("typeof recipients",typeof recipients);
			console.log("typeof recipients",recipients);
			Object.values(recipients).forEach(recipient => {
				if(recipient!==currentUser.uid){
					firestore.collection('users').doc(recipient).update({
						conversations:firebase.firestore.FieldValue.arrayUnion(res.id)
					})
				}
				
			});
			firestore.collection('users').doc(currentUser.uid).update({
				conversations:firebase.firestore.FieldValue.arrayUnion(res.id)

			})
			
		})
	}

	function handleCreateConversation(e){
		e.preventDefault()
		console.log(selectedContactIds)
		selectedContactIds.push(currentUser.uid)
		createConversation(selectedContactIds)
		setShow(false)
	}

	function createData(e){
		e.preventDefault()
		firestore.collection('users').doc(currentUser.uid).update({
			contacts:firebase.firestore.FieldValue.arrayUnion({id:idRef.current.value,name:nameRef.current.value})
		}).then(()=>{
			console.log("contact updated")
			
		})
		.catch(err=>{
			console.log(err)
		})
		setShow(false)

	}
	return (
		// <motion.div className="backdrop" 
		// 	onClick={handleClick}
		// 	initial={{opacity:0}}
		// 	animate={{opacity:1}}
		// >
		// 	<motion.img src={selectedImg} alt="enlarged pic" 
		// 		initial={{y:"-100vh"}}
		// 		animate={{y:0}}
		// 	/>
		// </motion.div>
		<>
		{modalName==='contacts' ? 
			<div className="backdrop" onClick={handleClick}>
			<div className="modal-wrapper">
				<div className="modal-content">
					<div className="modal-header">
						<p>Create Contact</p>
						<button class="close" onClick={closeModalHandler}>x</button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label className="form-label">Id</label>
								<input className="form-control" type="text" ref={idRef} required />	
							</div>
							<div className="form-group">
								<label className="form-label">Name</label>
								<input className="form-control" type="text" ref={nameRef} required />
							</div>
							
							<button className="btn btn-primary" onClick={createData}>Create</button>
						</form>
					</div>
					
				</div>
			</div>
		</div> :
		<div className="backdrop" onClick={handleClick}>
		<div className="modal-wrapper">
			<div className="modal-content">
				<div className="modal-header">
					<p>Create Conversation</p>
					<button class="close" onClick={closeModalHandler}>x</button>
				</div>
				{/* <div className="modal-body">
					<form>
						<div className="form-group">
							<label className="form-label">Id</label>
							<input className="form-control" type="text" ref={idRef} required />	
						</div>
						<div className="form-group">
							<label className="form-label">Name</label>
							<input className="form-control" type="text" ref={nameRef} required />
						</div>
						
						<button className="btn btn-primary" onClick={createData}>Create</button>
					</form> */}
					<div>
						<form onSubmit={handleCreateConversation}>
						{docs && docs.map(doc=>{
							return doc.contacts.map(contct => {
								return (
								// <form>
								
									<div className="form-group" key={contct.id}>
										<div className="form-check" >

										
										<input 
											key={contct.id}
											type="checkbox" 
											id={contct.id} 
											className="form-check-input" 
											value={selectedContactIds.includes(contct.id)}
											onChange={()=>{handleCheckboxChange(contct.id)}}
										/>
										<label for={contct.id} className="form-check-label" >{contct.name}</label>
										{/* <h2>{contct.id}</h2>
										<p>{contct.name}</p> */}
									</div>
									</div>
									
									// </form>
								)
								
							})
						})}
						<button className="btn btn-primary" style={{marginLeft:'18px',marginBottom:'18px'}} type="submit">Create</button>
						</form>
					</div>
				{/* </div> */}
				
			</div>
		</div>
	</div>
		}
		
		</>
	)
}

export default Modal
