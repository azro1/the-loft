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
        // reaches out to firebase auth and it tries to sign a user up with an email & password - the createUserWithEmailAndPassword logs a user in on the firebase server and this method takes in 2 arguments and sends back a response object and on that object is a user property and that will be the user that it just created
        const response = await auth.createUserWithEmailAndPassword(email, password)
        // console.log(response.user)

        if (!response) {
          throw new Error('Could not complete sign up')
        }





        /* 
        we're going to upload the image here and the reason we're doing it after we create a new user is because we need a uid for that user because we're going to use that id as the path to the image when we upload it - so when we upload images we can upload them into folders and we're going to crete a folder for the user and the folder name is going to be the id of the user

        so the first step in uploading images is to create some kind of upload path and that upload path is going to be like a folder structure where we want to store it inside our storage bucket

        so first of all i'm going to say i we want to store it inside of a thumbnails folder and what this will do is when we're eventually making the request to upload the image - it's going to look at our storage bucket and it's going to see this doesn't exist yet and then it's going to create that folder but thereafter it does exist it's going to say: "ok i'm going to go into that folder" 
        
        and then after, i want to do another folder and this folder is going to be the uid of the user that's just signed up so that every user has their own folder with their own image in it and that's going to make it easier later to access image for individual people using their unique id
      
        and then finally we want to specify the name of the image which we have on the thumbnail itself

        so this is path that we want to upload the image to in our storage bucket
        */

        // upload user thumbnail
        const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`

        // this ref method acepts a path which will be a reference to where we want to upload the image - so we have a reference to a very specific place inside of our bucket now of where we want to upload something to and then all we have to do is use the put method which puts a file into that place and then we pass in whatever file we want to put there and this returns to use an object (some kind of response)
        const image = await fileStore.ref(uploadPath).put(thumbnail)
        
        // now on this image object there are different properties and a method that we can use to get the url of the image that we've just uploaded and that's what we need to do remember - we need to pass that url in below
        const imageUrl = await image.ref.getDownloadURL()




        // Add photoURL to user - if you remember back to when we first talked about this method i said that we can also pass in different properties and one of those other properties is the photoURL and this is the property we're going to use to add an image / avatar for that user - so we know that by this point we need a url to a paticular image so we know that we have to upload the image before we run this line of code because we need to get the url for that image and pass it in right here
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