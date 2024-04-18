import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LoginFailedModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login Failed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your login attempt was unsuccessful. Please try again.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginFailedModal;
