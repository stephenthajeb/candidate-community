import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { AlertContext } from '../../../provider/AlertProvider'
import { getAllUsername } from '../../../firebase/utils'

const Community = () => {
  const [users, setUsers] = useState([])
  let history = useHistory()
  const { addAlert } = useContext(AlertContext)

  const fetchUsernames = useCallback(async () => {
    try {
      const data = await getAllUsername()
      await setUsers(data)
    } catch (err) {
      addAlert('danger', err.message)
    }
  }, [addAlert])

  useEffect(() => {
    fetchUsernames()
  }, [fetchUsernames])

  return (
    <div>
      <h2 className="mb-3">Candidates List View</h2>
      <ul className="list-group">
        {users &&
          users.map((username) => (
            <li className="list-group-item" key={username}>
              <span>{username}</span>
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
