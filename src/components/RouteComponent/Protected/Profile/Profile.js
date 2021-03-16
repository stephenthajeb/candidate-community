import React, { useContext, useEffect, useState } from 'react'
import fb from '../../../../firebase/firebaseConfig'
import { Row, Col, Button, Container, Image, Card } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { firebaseAuth } from '../../../../provider/AuthProvider'
import PersonalDataForm from './PersonalDataForm'
import WorkExpCard from './WorkExpCard'
import WorkExpForm from './WorkExpForm'

// Todo : better layouting
const Profile = () => {
  const [userData, setUserData] = useState({})
  const [showPdModal, setShowPdModal] = useState(false) //state to control Personal Data Modal
  const [showExpModal, setShowExpModal] = useState(false)
  const { token } = useContext(firebaseAuth)
  const { username, name, email, profile, age, workExperiences } = userData
  const textData = { username, email, name, age }

  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token)
      const user_id = decode.user_id
      const currentUserRef = fb.database().ref(`users/${user_id}`)
      // Real time updates : 'value' event listener will actively listen to change
      currentUserRef.on('value', (snapshot) => {
        if (snapshot.exists()) setUserData(snapshot.val())
      })
    }
  }, [token])

  const hidePdModal = () => setShowPdModal(false)
  const hideExpModal = () => setShowExpModal(false)

  return (
    <>
      <Container>
        <h2 className="text-justify">
          Personal Data
          <span className="float-right">
            <Button
              variant="warning"
              type="button"
              size="sm"
              className="mr-2"
              onClick={() => setShowPdModal(true)}
            >
              Edit
            </Button>
          </span>
        </h2>
        <hr />
        <PersonalDataForm
          showModal={showPdModal}
          hideModal={hidePdModal}
          data={{ name, age, profile }}
        />
        <Card>
          <Card.Body>
            <Row>
              <Col
                lg={3}
                md={12}
                className="m-auto d-md-flex justify-content-center"
              >
                {profile ? (
                  <Image fluid src={profile} />
                ) : (
                  <Image
                    fluid
                    src="https://rimatour.com/wp-content/uploads/2017/09/No-image-found.jpg"
                  />
                )}
              </Col>
              <Col lg={9} className="mt-3">
                {Object.keys(textData).map((key) => (
                  <p key={key}>
                    {`${key}: `}{' '}
                    <span>{textData[key] ? textData[key] : '-'}</span>
                  </p>
                ))}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container className="my-5">
        <h2>Work Experiences</h2>
        <hr />
        {workExperiences &&
          workExperiences.map((workExperience, idx) => (
            <WorkExpCard key={idx} data={workExperience} idx={idx} />
          ))}
        <Button
          type="submit"
          variant="success"
          className="w-100"
          onClick={() => setShowExpModal(true)}
        >
          Add New Experience
        </Button>
        <WorkExpForm
          showModal={showExpModal}
          hideModal={hideExpModal}
          data={null}
          idx={workExperiences ? workExperiences.length : 0}
        />
      </Container>
    </>
  )
}

export default Profile
