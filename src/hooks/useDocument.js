import {  useState, useEffect } from 'react'
import { db } from '../firebase/config'

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // subscribe to realtime docuemnt data
  useEffect(() => {
    // reference
    const ref = db.collection(collection).doc(id)

    // listener
    const unsubscribe = ref.onSnapshot((snapshot) => {
      if (snapshot.data()) {
        // update state
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
      } else {
        setError('that document does not exist.')
      }
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




