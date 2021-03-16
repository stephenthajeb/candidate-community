import React, { useState, useCallback, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import fb from '../../../../firebase/firebaseConfig'
import { getCurrentUsername } from '../../../../firebase/utils'
import AccessibilityForm from './AccessibilityForm'

const Settings = () => {
  const [showAccessiblityModal, setShowAccessibilityModal] = useState(false)
  const [accessibility, setAccessibility] = useState(false)

  const fetchData = useCallback(async () => {
    const username = await getCurrentUsername()
    const accessiblitityRef = fb.database().ref(`accessibility/${username}`)
    accessiblitityRef.on('value', (snapshot) => {
      if (snapshot.exists()) setAccessibility(snapshot.val())
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const accessibilityData = [
    {
      label: 'Your profile picture visibility is set to: ',
      value: accessibility && accessibility.profile,
    },
    {
      label: 'Your name visibility is set to:',
      value: accessibility && accessibility.name,
    },
    {
      label: 'Your age visibility is set to:',
      value: accessibility && accessibility.age,
    },
    {
      label: 'Your work experiences visibility is set to:',
      value: accessibility && accessibility.workExperiences,
    },
  ]

  const hideAccessiblityModal = () => setShowAccessibilityModal(false)

  return (
    <Container>
      <h2>
        Data Accessibility Settings
        <span className="float-right">
          <Button
            variant="warning"
            type="button"
            size="sm"
            className="mr-2"
            onClick={() => setShowAccessibilityModal(true)}
          >
            Edit
          </Button>
        </span>
      </h2>
      <hr />
      {accessibilityData.map((item, idx) => (
        <p key={idx} className="h3 my-4">
          {item.label}
          <span className="h3 float-right">
            <b>{item.value ? 'Public' : 'Private'}</b>{' '}
          </span>
        </p>
      ))}
      <AccessibilityForm
        showModal={showAccessiblityModal}
        hideModal={hideAccessiblityModal}
      />
    </Container>
  )
}

export default Settings
