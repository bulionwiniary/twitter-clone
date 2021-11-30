import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAJZtr2B_e8gUL1pRdJKZ3CNzszFw8Hzyw",
    authDomain: "twitter-clone-4d417.firebaseapp.com",
    projectId: "twitter-clone-4d417",
    storageBucket: "twitter-clone-4d417.appspot.com",
    messagingSenderId: "664701771330",
    appId: "1:664701771330:web:31c758eac527b0488b97db"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  const db = getFirestore()
  const storage = getStorage()

  export default app
  export { db, storage }