import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';

const ConfirmDelete = ({ isVisible, onOk, onCancel }) => {
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
            <CancelBtn />
            <Button type="primary" onClick={handleOk} className=' bg-blue-600 hover:bg-blue-400'>
              OK
            </Button>
          </>
        )}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    );
  };
  
export default ConfirmDelete;