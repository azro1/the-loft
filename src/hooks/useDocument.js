import {  useState, useEffect } from 'react'
import { db } from '../firebase/config'

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // subscribe to realtime collection data
  useEffect(() => {
    const ref = db.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot((snapshot) => {
      // update state
      setDocument({ ...snapshot.data(), id: snapshot.id })
      setError(null)
    }, (err) => {
      console.log(err.message)
      setError('Failed to get document.')
    })
    // unsubscribe on umount
    return () => unsubscribe()
  }, [collection, id])

  return { document, error }

}

export { useDocument }




