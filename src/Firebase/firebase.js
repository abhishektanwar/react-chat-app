import firebase from 'firebase/app'
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
	apiKey: "AIzaSyCGjKCbInRup-2KN-NKUh4Rt1UbuMZdnaU",
  authDomain: "chat-app-b66fe.firebaseapp.com",
  projectId: "chat-app-b66fe",
  storageBucket: "chat-app-b66fe.appspot.com",
  messagingSenderId: "266462387379",
  appId: "1:266462387379:web:ddb7b884d147498220e4c6"
})

export const auth = app.auth()
export const firestore = firebase.firestore();
export default app