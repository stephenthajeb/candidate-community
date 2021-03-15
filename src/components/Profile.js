import React, { useEffect, useState } from 'react'
import fb from '../firebase/firebaseConfig'
import { Row, Col, Card, Button, Container, Modal, Form } from 'react-bootstrap'
import { getCurrentUser } from '../firebase/utils'
import PersonalDataEdit from './PersonalDataEdit'

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

// const initialState = {
//   name: '',
//   email: '',
//   profile: '',
//   age: '',
//   workExperiences: [],
// }

const Profile = () => {
  const [userData, setUserData] = useState({})
  const [showPdModal, setShowPdModal] = useState(false) //state to control Personal Data Modal
  const [showExpModal, setShowExpModal] = useState({ show: false, type: '' }) //state to control Work Experiences Modal; type is either 'add' or 'edit'

  useEffect(() => {
    getData()
  }, [])

  // fetch data from database and store it to local state variable
  const getData = async () => {
    try {
      const data = await getCurrentUser()
      setUserData(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    console.log(userData)
  }, [userData])

  const { username, name, email, profile, age, workExperiences } = userData

  const hidePdModal = () => setShowPdModal(false)
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
      <PersonalDataEdit showModal={showPdModal} hideModal={hidePdModal} />
      <Row>
        <Col lg={3}>{profile ? 'Image Found' : 'No Image'}</Col>
        <Col lg={9}>
          {username && (
            <p>
              <span>Username: </span>
              {username}
            </p>
          )}
          {/* {name && <p>{name}</p>}
          {email && <p>{email}</p>}
          {age && <p>{age}</p>} */}
        </Col>
      </Row>
      <h1>
        Work Experiences <span className="float-right">Edit</span>
      </h1>
      {workExperiences &&
        workExperiences.map((workExperience) => <Card> hehe</Card>)}
    </Container>
  )
}

export default Profile
