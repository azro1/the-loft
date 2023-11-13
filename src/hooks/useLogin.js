import { useState, useEffect } from "react"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogin = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // destructure dispatch function from hook
    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        setError(null)
        setIsPending(true)
       
        // log the user in
        try {
            // this reaches out to firebaseAuth and it tries to sign a user in and the signInWithEmailAndPassword method takes in 2 arguments and returns a response object and on this response object is a user property
            const response = await auth.signInWithEmailAndPassword(email, password)






            // update online status

            /* when a user logs in we need to update the online property on the user document stored in the users colection to false after they login and the reason we need to do it after they login is because later on we're going to lock down our database using firestore rules by sayimg: "i only want users who are logged in to be able to edit their own document" and that's what we need to do we need to edit our own document here because we're changing it from being online (false) to online (true) 
            
            so if we try to make that request before we sign in - when we make that request firebase is going to say: "well look, no you locked down the data so that only a user can edit their own document and now we don't have a user logged in so i'm not going to allow that request"

            so we have to do it after we login so that the uid of the user making the request matches the document we're trying to update
            */
            await db.collection('users').doc(response.user.uid).update({ online: true })






            // and that user is what we specify to be the payload of the dispatch action and that means that it's going to update our AuthContext state to be this user
            dispatch({ type: 'LOGIN', payload: response.user })

            // update state
            if (!isCancelled) {
              setIsPending(false)
              setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
              setError(err.message)
              console.log(err.message)
              setIsPending(false)
            }
        }
    }
    
    // cleanup function
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, login }

}

export { useLogin }