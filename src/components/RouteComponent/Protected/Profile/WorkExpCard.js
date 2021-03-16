import React, { useState } from 'react'
import { Card, Button, Image, Row, Col } from 'react-bootstrap'
import WorkExpForm from './WorkExpForm'

const WorkExpCard = ({ data, idx }) => {
  const { title, company, start, end, desc, isStillWorking, companyLogo } = data
  const textData = {
    company,
    start,
    desc,
    end: isStillWorking ? 'now' : end,
  }
  const [showExpEditModal, setShowExpEditModal] = useState(false)

  const hideExpModal = () => setShowExpEditModal(false)
  return (
    <>
      <Card>
        <Card.Header>
          <h5>
            {title}
            <span className="float-right">
              <Button
                variant="warning"
                size="sm"
                type="button"
                onClick={() => setShowExpEditModal(true)}
              >
                Edit
              </Button>
            </span>
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col
              lg={3}
              md={12}
              className="m-auto d-md-flex justify-content-center"
            >
              <Image src={companyLogo} fluid />
            </Col>
            <Col lg={9}>
              {Object.keys(textData).map((key) => (
                <div key={key}>
                  {key} : <span>{data[key]}</span>{' '}
                </div>
              ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <WorkExpForm
        data={data}
        idx={idx}
        showModal={showExpEditModal}
        hideModal={hideExpModal}
      />
    </>
  )
}

export default WorkExpCard
