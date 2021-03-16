import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'
import { getUserAllData } from '../../../firebase/utils'
import { AlertContext } from '../../../provider/AlertProvider'
import WorkExpCard from './Profile/WorkExpCard'

const UserDetail = () => {
  let { username } = useParams()
  console.log(username)
  const [userData, setUserData] = useState({ data: {}, isCurrentUser: null })
  const { data, isCurrentUser } = userData
  const { addAlert } = useContext(AlertContext)

  const fetchAccessibleData = useCallback(async () => {
    try {
      const data = await getUserAllData(username)
      await setUserData(data)
    } catch (err) {
      addAlert('danger', err.message)
    }
  }, [username, addAlert])

  useEffect(() => {
    fetchAccessibleData()
  }, [fetchAccessibleData])

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
                {data && data.profile ? (
                  <Image fluid src={data.profile} roundedCircle />
                ) : (
                  <Image
                    fluid
                    src="https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg"
                  />
                )}
              </Col>
              <Col lg={9}>
                <p>Name: {data && data.name ? data.name : 'private Data'}</p>
                <p>Age: {data && data.age ? data.age : 'private Data'}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container className="my-5">
        <h2>User Work Experiences</h2>
        <hr />
        {data && data.workExperiences ? (
          data.workExperiences.map((workExperience, idx) => (
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
