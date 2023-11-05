import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async() => {
        setError(null)
        setIsPending(true)
       
        // sign the user out
        try {
            // signs the user out on from the Firebase server - it's going to wait right here until it completes this before it moves on - that's why we have the await keyword so that it doesn't move on and try to dispatch the action before the user is signed out
            await projectAuth.signOut()

            // dispatch logout action to log user out of our local state - we don't need to pass in a payload here because we don't need to set the user to be anything other thasn null - if they logout - the user becomes null right? so the payload we can just skip
            dispatch({ type: 'LOGOUT' })

            // update state
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

    return { error, isPending, logout }

}

export { useLogout }