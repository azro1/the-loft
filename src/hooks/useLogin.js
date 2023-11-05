import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogin = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        setError(null)
        setIsPending(true)
       
        // log the user in
        try {
            // this reaches out to firebaseAuth and it tries to sign a user in and the signInWithEmailAndPassword method takes in 2 arguments and returns a response object and on this response object is a user property
            const response = await auth.signInWithEmailAndPassword(email, password)

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