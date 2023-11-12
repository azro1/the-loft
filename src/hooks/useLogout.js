import { useState, useEffect } from "react"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

const useLogout = () => {
    // cleanup function state
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    // destructure dispatch funtion from hook
    const { dispatch, user } = useAuthContext()

    const logout = async() => {
        setError(null)
        setIsPending(true)
       
        // sign the user out
        try {

            // update online status

            /* when a user logs out we need to update the online property on the user document stored in the users colection to false before they actually logout and the reason we need to do it before they logout is because later on we're going to lock down our database using firestore rules by sayimg: "i only want users who are logged in to be able to edit their own document" and that's what we need to do we need to edit our own document here because we're changing it from being online (true) to online (false) 
            
            so if we sign out first and then try to make that request - when we make that request firebase is going to say: "well look, no you locked down the data so that only a user can edit their own document and now we don't have a user logged in so i'm not going to allow that request"

            so we have to do it before we sign out so that the uid of the user making the request matches the document we're trying to update
            */
            const { uid } = user
            await db.collection('users').doc(uid).update({ online: false })





            
            // signs the user out on from the Firebase server - it's going to wait right here until it completes this before it moves on - that's why we have the await keyword so that it doesn't move on and try to dispatch the action before the user is signed out
            await auth.signOut()

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