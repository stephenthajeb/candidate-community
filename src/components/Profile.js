import React, { useContext, useEffect, useState } from 'react'
import fb from '../firebase/firebaseConfig'
import { Row, Col, Button, Container, Image } from 'react-bootstrap'
import PersonalDataForm from './PersonalDataForm'
// import { getCurrentUser } from '../firebase/utils'
import jwt_decode from 'jwt-decode'
import { firebaseAuth } from '../provider/AuthProvider'
import WorkExpCard from './WorkExpCard'
import WorkExpForm from './WorkExpForm'

// 1. Name
// 2. Profile picture
// 3. Age
// 4. Work experiences (the following are information required for each instance)
// Start date
// End date (allow a current position option)
// Job title
// Company
// Company logo
// Job description

// Todo : better layouting
const Profile = () => {
  const [userData, setUserData] = useState({})
  const [showPdModal, setShowPdModal] = useState(false) //state to control Personal Data Modal
  const [showExpModal, setShowExpModal] = useState(false)

  const { token } = useContext(firebaseAuth)

  useEffect(() => {
    if (token) {
      const decode = jwt_decode(token)
      const user_id = decode.user_id
      var currentUserRef = fb.database().ref(`users/${user_id}`)
      // 'value' event listener will actively listen to change
      currentUserRef.on('value', (snapshot) => {
        if (!snapshot.exists()) throw new Error('No data available')
        setUserData(snapshot.val())
      })
    }
  }, [token])

  const { username, name, email, profile, age, workExperiences } = userData
  const textData = { username, name, email, age }
  // const personalData = [
  //   {
  //     name: 'username',
  //     value: username,
  //   },
  //   {
  //     name: 'email',
  //     value: email,
  //   },
  //   {
  //     name: 'name',
  //     value: name,
  //   },
  //   {
  //     name: 'age',
  //     value: age,
  //   },
  // ]

  const hidePdModal = () => setShowPdModal(false)
  const hideExpModal = () => setShowExpModal(false)
  return (
    <Container>
      <h1>
        Personal Data{' '}
        <span className="float-right">
          <Button
            variant="warning"
            type="button"
            onClick={() => setShowPdModal(true)}
          >
            Edit
          </Button>
        </span>
      </h1>
      <PersonalDataForm
        showModal={showPdModal}
        hideModal={hidePdModal}
        data={{ name, age, profile }}
      />
      <Row>
        <Col lg={3}>
          {profile ? <Image fluid src={profile} roundedCircle /> : 'No Image'}
        </Col>
        <Col lg={9}>
          {Object.keys(textData).map((key) => (
            <p key={key}>
              {`${key}: `} <span>{textData[key] ? textData[key] : '-'}</span>
            </p>
          ))}
        </Col>
      </Row>
      <h1>Work Experiences</h1>
      {workExperiences &&
        workExperiences.map((workExperience, idx) => (
          <WorkExpCard key={idx} data={workExperience} idx={idx} />
        ))}
      <Button
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
  )
}

export default Profile
