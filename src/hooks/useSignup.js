import { useState, useEffect } from "react"
import { auth, fileStore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

const useSignup = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // destructure dispatch funtion from hook
    const { dispatch } = useAuthContext()
  
    const signUp = async (email, password, displayName, thumbnail) => {
      setError(null)
      setIsPending(true)

      try {
        // we need an image before we create the user
        if (!thumbnail) {
          throw new Error('Please choose a file.')
        }
        // reaches out to firebase auth and it tries to sign a user up with an email & password - the createUserWithEmailAndPassword logs a user in on the firebase server and this method takes in 2 arguments and sends back a response object and on that object is a user property and that will be the user that it just created
        const response = await auth.createUserWithEmailAndPassword(email, password)
        // console.log(response.user)

        if (!response) {
          throw new Error('Could not complete sign up')
        }
        // upload user thumbnail
        const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
        const image = await fileStore.ref(uploadPath).put(thumbnail)
        const imageUrl = await image.ref.getDownloadURL()

        await response.user.updateProfile({ displayName, photoURL: imageUrl })
        
        // we dispatch a login event and that LOGIN action passes through the user as the payload so that we can update that in our global auth context and therefore we have access to that user in the entire application
        dispatch({type: 'LOGIN', payload: response.user })
  
        // finally we update hte state down here as long as the component has not been unmounted
        if (!isCancelled) {
          setIsPending(false)
          setError(null)
        }
  
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message)
          setError(err.message)
          setIsPending(false)
        }
      }
    }
    
    // cleanup function
    useEffect(() => {
      return () => setIsCancelled(true)
  }, [])
  
    return { error, isPending, signUp }
  }
  
  export { useSignup }
  
  // After we sign up we get back a user object and this user object contains the JWT for that user which Firebase uses to authenticate them on the firebase server. That token is passed back n forth from our website to Firebase on every request (for something like data from the database)
  
  // Whenever Firebase recieves a request with a valid token - it see's that user as being logged in or authenticated but we can also use that user object in our front-end application to do serveral things aswell - we can:
  
  // Protect content or pages from users that are not logged in so they don't see them 
  // Show different content to users who are logged in than those who are not
  // Use the data on the user object like the email or displayName
  
  // So ideally, we want to store this user object in some kind of "Global State" when the user is logged in and for that we'll be using react Context.