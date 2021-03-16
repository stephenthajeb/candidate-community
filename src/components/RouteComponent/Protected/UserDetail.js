import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'
import { getUserAllData } from '../../../firebase/utils'
import { AlertContext } from '../../../provider/AlertProvider'
import WorkExpCard from './Profile/WorkExpCard'

const UserDetail = () => {
  let { username } = useParams()
  const [userData, setUserData] = useState({ data: {}, isCurrentUser: null })
  const { addAlert } = useContext(AlertContext)
  const { name, age, profile, workExperiences, isCurrentUser } = userData

  const fetchAccessibleData = useCallback(async () => {
    try {
      const res = await getUserAllData(username)
      await setUserData(res)
    } catch (err) {
      addAlert('danger', err.message)
    }
  }, [username, addAlert])

  useEffect(() => {
    fetchAccessibleData()
  }, [fetchAccessibleData])

  useEffect(() => {
  }, [userData])

  return !isCurrentUser ? (
    <>
      <Container>
        <h2 className="text-justify">User Detail</h2>
        <hr />
        <Card>
          <Card.Body>
            <Row>
              <Col
                lg={3}
                md={12}
                className="m-auto d-md-flex justify-content-center"
              >
                {profile && profile ? (
                  <Image fluid src={profile} roundedCircle />
                ) : (
                  <Image
                    fluid
                    src="https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg"
                  />
                )}
              </Col>
              <Col lg={9}>
                <p>Name: {name ? name : 'private'}</p>
                <p>Age: {age ? age : 'private'}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container className="my-5">
        <h2>User Work Experiences</h2>
        <hr />
        {workExperiences ? (
          workExperiences.map((workExperience, idx) => (
            <WorkExpCard key={idx} data={workExperience} idx={idx} />
          ))
        ) : (
          <h3>This section is private</h3>
        )}
      </Container>
    </>
  ) : (
    <Redirect to="/profile" />
  )
}

export default UserDetail
