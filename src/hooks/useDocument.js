import { useState, useEffect } from "react"
import { db } from "../firebase/config"

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  
  // realltime data
  useEffect(() => {
    const ref = db.collection(collection).doc(id)
    const unsubscribe = ref.onSnapshot((snapshot) => {
      // update state
      setDocument({ ...snapshot.data() })
      setError(null)
    }, (err) => {
      console.log(err.message)
      setError('Failed to get document.')
    })

  // unsubscribe on unmount
    return () => unsubscribe()
  }, [collection, id])

  return { error, document }
}

export { useDocument }