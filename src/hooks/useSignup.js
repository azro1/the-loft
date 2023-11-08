import { useState, useEffect } from "react"
import { auth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

const useSignup = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    // destructure dispatch funtion from hook
    const { dispatch } = useAuthContext()
  
    const signUp = async (email, password, displayName) => {
      setError(null)
      setIsPending(true)
      try {
        // reaches out to firebase auth and it tries to sign a user up with an email & password - the createUserWithEmailAndPassword logs a user in on the firebase server and this method takes in 2 arguments and sends back a response object and on that object is a user property and that will be the user that it just created
        const response = await auth.createUserWithEmailAndPassword(email, password)
        // console.log(response.user)

        if (!response) {
          throw new Error('Could not complete sign up')
        }
        // Add display name to user - we first need to create the user using the createUserWithEmailAndPassword method and then we can update the user profile using the updateProfile method on the user property (which takes in an object) to set the displayName
        await response.user.updateProfile({ displayName })
  


        // dispatch the action down here so after we've updated the displayName now we need to import dispatch first of all from our AuthContext and what we can do is import our useAuthContext hook because we can grab it from the context object that is returned because on our Provider we passed it through as a value - now rememebr we need 2 properties:
  
        // type - which is going to be 'LOGIN'
        // payload - the user in the response
        dispatch({type: 'LOGIN', payload: response.user })
  
  
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