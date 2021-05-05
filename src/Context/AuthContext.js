// import React,{ useContext,useState,useEffect } from 'react'
// import { auth,firestore } from '../Firebase/firebase'
// import firebase from 'firebase'
// const AuthContext = React.createContext()

// export function useAuth(){
// 	return useContext(AuthContext)
// }
// export function AuthProvider({children}) {
// 	const [currentUser,setCurrentUser] = useState()
// 	const [loading,setLoading] = useState(true)

// 	function signup(email,password,username){
// 		return auth.createUserWithEmailAndPassword(email,password)
// 		// .then(cred=>{
//         //     return firestore.collection("users").doc(cred.user.uid).set({
//         //         display_name:username,
//         //         status:"online",
//         //         createdAt:firebase.firestore.FieldValue.serverTimestamp()
//         //     })
//         // })
// 		// .then(()=>{
// 		// 	console.log("user added")
// 		// })
// 		// .catch(err=>{
// 		// 	console.log(err)
// 		// })
// 	}

// 	function login(email,passowrd){
// 		return auth.signInWithEmailAndPassword(email,passowrd)
// 	}

// 	function logout(){
// 		return auth.signOut()
// 	}

// 	useEffect(()=>{
// 		const unsubscribe = auth.onAuthStateChanged(user=>{
// 			setCurrentUser(user)
// 			setLoading(false)
// 		})
// 		return unsubscribe

// 	},[])

// 	const value = {
// 		currentUser,
// 		login,
// 		signup,
// 		logout
// 	}
	
// 	return (
// 		<AuthContext.Provider value={value}>
// 			{!loading && children}
// 		</AuthContext.Provider>
// 	)
// }


import React, { useContext, useEffect, useState } from 'react'
import { auth,firestore } from "../Firebase/firebase"
import firebase from 'firebase'
const AuthContext = React.createContext()

export function useAuth(){
	return useContext(AuthContext)
}
export function AuthProvider({children}) {
	const [currentUser,setCurrentUser] = useState()
	const [loading,setLoading] = useState(true)

	function signup(email, password,username){
		return auth.createUserWithEmailAndPassword(email,password)
		.then(cred => {
			return firestore.collection("users").doc(cred.user.uid).set({
                display_name:username,
                status:"online",
				photoURL:"",
				status:"",
				messages:[{notificationId:"",number:0}],
                createdAt:firebase.firestore.FieldValue.serverTimestamp()
            })
		})
	}

	function login(email,password){
		// const curr = auth.signInWithEmailAndPassword(email, password)
		// console.log('uid',auth.currentUser.uid)
		// console.log(curr)
		return auth.signInWithEmailAndPassword(email, password)
		// .then(async user=>{
		// 	// console.log(user)
		// 	await firebase.firestore().collection('users')
		// 	.where('id',"==",user.uid).get()
		// 	.then(snapshot=>{
		// 		console.log(snapshot)
		// 	})
		// })
	}

	function logout(){
		return auth.signOut()
	}

	function resetPassword(email){
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email){
		return currentUser.updateEmail(email)
	}

	function updatePassword(password){
		return currentUser.updatePassword(password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return unsubscribe
	},[])

	const value = {
		currentUser,
		signup,
		login,
		logout
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
