import React, { createContext } from "react";
import { Button, Modal, Space } from "antd";

const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);

type DeleteModalProps = {
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm }) => {
  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: "Are you sure you want to delete?",
    okText: "Yes, Delete",
    cancelText: "No",
    onOk: onConfirm,
  };

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <Button
          danger
          onClick={() => {
            modal.confirm(config);
          }}
        >
          Delete
        </Button>
      </Space>
      {contextHolder}
      <UnreachableContext.Provider value="Bamboo" />
    </ReachableContext.Provider>
  );
};

export default DeleteModal;
