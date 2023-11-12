import { useState, useEffect } from "react"
import { auth, fileStore, db } from '../firebase/config'
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






        // create a user document

        /* there's one more thing that we need to do when we sign up a new user and that is to create them a user document inside of a users collection in a firestore database and that's so that we can store 3 extra bits of information about each user so that we can access it all later

        1. photoURL - to access all images to display in a sidebar
        2. displayName - to access all names to display in a sidebar
        3. an online status (true or false) - which we're going to update everytime a user logs in our out

        now we need to do this after we've signed a user up so we have access to the things that we need to store in that document so at this point we know we have those bits of information - the displayName and the photoURL 

        so the first time firestore tries to create a document inside this folder - if it doesn't exist it will create this collection - so we're going into the users collection and we want to create a document now in the past we've just said add and we add a document now when we do that firestore automatically assigns that new document an id property but this time i want to create that id myself and that's because i want the document id to be the uid of the user so that we can associate a specific document to a particular user (identify a document as the users document)
        
        so in order to do that we don't use the add method - instead what we need to do is use the doc method and remember, when we use the doc method we need to pass in a reference or the id to a spacific document (so if we already had that id an that document already existed we'd just pass in that id right here we'd get a reference to that document and we could something like update it) but this time we don't want to do that - we want to pass in the id of the document we want to create that doesn't exist yet

        now, that id is going to come from the user object that is created after a user signs up
        
        and what this does for us now is create a reference to a new document inside of the users collection with this id - now, it doesn't exist yet but it's going to create it for us and then on this we can use another method to update the properties on that document and that method is the set method 
        
        so then, we are basically setting a new document here - we are creating a reference to it and then setting that document by adding data to it
        */
        await db.collection('users').doc(response.user.uid).set({
          online: true,
          displayName,
          photoURL: imageUrl
        })
        
        // so now every user has their own document when they first sign up an again - the reason why  we're creating this collection of user documents is so that later i can reach out and i can grab all of the user documents so that we can list out all of the users on the webpage to show all of the users that are currently online but not only just online - also all of the user that are a part of the application (so in this application it might be all of your team members) and we'll show all of their little photoURL's or avatars aswell






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