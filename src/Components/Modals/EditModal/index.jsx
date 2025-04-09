import React from "react";
import { Modal, Input } from "antd";

const EditModal = ({
    isModalVisible,
    handleEdit,
    handleCancel,
    updatedTitle,
    updatedDescription,
    setUpdatedTitle,
    setUpdatedDescription,
    isEditing,
  }) => {
    return (
        <Modal
        title="Edit Todos"
        open={isModalVisible}
        onOk={handleEdit}
        onCancel={handleCancel}
        confirmLoading={isEditing}
        cancelText="Cancel"
        okText="Save"
        width={400}
      >
        <Input
          placeholder="Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.TextArea
          placeholder="Description"
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          rows={3}
        />
      </Modal>
      
    );
  };

export default EditModal;
