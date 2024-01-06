import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const DeleteConfirmModel = ({ isVisible, onOk, onCancel }) => {
    console.log('Rendering DeleteConfirmModal'); // Log when the component renders
  
    const handleOk = () => {
      console.log('Ok button clicked');
      onOk(); // Ensure onOk is being called
    };
  
    const handleCancel = () => {
      console.log('Cancel button clicked');
      onCancel(); // Ensure onCancel is being called
    };
  
    return (
      <Modal
        visible={isVisible}
        title="Confirm Deletion"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button type="primary" onClick={handleOk}>
              Confirm
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    );
  };
  
export default DeleteConfirmModel;