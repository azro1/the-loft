import { createContext, useEffect, useReducer } from "react";
import { auth } from '../firebase/config'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
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
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsub()
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }} >
      { children }
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider, authReducer }

// After we sign up with Firebase - Firebase logs the user in and sends back the user object. So we can update our Context to log them in on the front-end too and store that user object in our Context for as long as they are logged in

// that way whilst the user is logged in - any component can access that user from the Context if they needed to so the first thing we'll do is make a case for a 'LOGIN' action inside of our switch statement