import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from '../firebase/config'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN': // 4. so now all we need to do is dispatch this action from somewhere (go back to useSignup.js)
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

// when we update the state the component is re-evluated meaning it runs again
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
      user: null,
      authIsReady: false
  })



  // on component first render fire useEffect to perform a check with Firebase to see if a user is logged in
  useEffect(() => {
    // this function communicates with firebase at asks Firebase to tell it whenever there's some kind of change in authentication status and when there is it's going to fire it's function and inside this function we take in the user. So if the authentication change is when a user just logs in - this function will fire and we get that user object back. If the authentication change is when a user logs out - this function will fire and the user object will be null ok? 
    
    // now also this function is going to fire once when we first ask Firebase this question as well so when we first connect to Firebase Firebase is going to look to see if we either have a user or we dont (there's either a user is logged in or there's not) but it's going to send back an initial response and when it does that onAuthStateChanged fires it's function and we're either going to have a user in that response or we're just going to have null as a value

    // so this method again - it fires the function once when we first communicate with Firebase to check for the user to begin with when we first reload the page and then also everytime there is a change in the user authentication so in the future if a user has logged out - then it's going to send back that information to us and fire this function wherby the user object will be null - if in the future a user logs in - again it's going to send that information back to us and it's going to fire this function and the user object will be the user that has just logged in

    // now there's one more step to this like i said a minute ago this function is going to fire everytime there is some kind of authentication state change so if in the future after we've performed this initial check a user logs in or out - we're also going to fire this function then and we're going to dispatch this 'AUTH_IS_READY' function then as well and we don't need to do that anymore - we only need to do this once initially to find out the initial user so how do we then cancel this kind of subscription to authentication status once we've performed this dispatch once initially - well like when we had a subscription to realtime data in firestore and we got an unsubscribe function returned to us, we get the same thing right here so invoking the onAuthStateChanged method on the projectAuth object returns to us a function which we can store in a const called unsub and when we invoke this function it unsubscribes from the onAuthStateChanged listener so that means for every authentication change in the future - once we unsubscribe - it no longer fires it's callback function

    // so after it fires once and we perform the dispatch to say look 'AUTH_IS_READY' - then we want to unsubscribe and we can just invoke unsub and now it's never going to fire again so we just perform this check once to begin with
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])




  // 7. so now we're updating the user in our auth context state to be the user who is logged in when they've signed up 
    return (
      <AuthContext.Provider value={{ ...state, dispatch }} >
        { children }
      </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider, authReducer }


// So after we sign up with Firebase - Firebase logs the user in and sends back the user object. So we can update our Context to log them in on the front-end too and store that user object in our Context for as long as they are logged in

// that way whilst the user is logged in - any component can access that user from the Context if they needed to so the first thing we'll do is make a case for a 'LOGIN' action inside of our switch statement