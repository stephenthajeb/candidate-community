import React, { useState, useEffect } from 'react'
import fb from '../../../firebase/firebaseConfig'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Community = () => {
  const [users, setUsers] = useState([])
  let history = useHistory()

  useEffect(() => {
    fb.database()
      .ref('/accessibility')
      .get()
      .then((snapshot) => {
        console.log(snapshot.val())
        const fetchedData = Object.keys(snapshot.val())
        setUsers([...fetchedData])
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => console.log(users), [users])

  return (
    <div>
      <h2 className="mb-3">Candidates List View</h2>
      <ul className="list-group">
        {users &&
          users.map((username) => (
            <li className="list-group-item" key={username}>
              {username}
              <Button
                variant="info"
                className="float-right"
                onClick={() => history.push(`users/${username}`)}
              >
                See Details
              </Button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Community
