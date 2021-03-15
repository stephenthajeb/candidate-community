import React, { useState, useEffect } from 'react'
import fb from '../firebase/firebaseConfig'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const Community = () => {
  const [users, setUsers] = useState([])
  let history = useHistory()

  useEffect(() => {
    fb.database()
      .ref('/users')
      .get()
      .then((snapshot) => {
        const fetchedData = Object.values(snapshot.val())
        setUsers([...fetchedData])
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => console.log(users), [users])

  const decoded = jwt_decode(localStorage.getItem('token'))
  console.log(decoded)

  return (
    <div>
      <h1>Candidates List View</h1>
      <ul className="list-group">
        {users &&
          users.map((user) => (
            <li className="list-group-item" key={user.username}>
              {user.username}
              <Button
                variant="info"
                className="float-right"
                onClick={() => history.push(`users/${user.username}`)}
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
