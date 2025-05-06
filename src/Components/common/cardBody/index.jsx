import React from "react";
import moment from "moment";
import { Spin, Checkbox, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import PinToggleIcon from "../PinIcon";

const TodoCardBody = ({
  todo,
  onTogglePin,
  onEditClick,
  onDelete,
  deleting,
  isTodoBeingPinned,
  isSelected,
  onSelectChange,
}) => {
  return (
    <div
      className="card-body text-dark d-flex flex-column"
      style={{ backgroundColor: "#F8F4E1", position: "relative" }}
    >
      <div
        className="position-absolute"
        style={{
          top: 0,
          right: 0,
          padding: "8px",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        {isTodoBeingPinned ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <PinToggleIcon isPinned={todo.isPinned} onToggle={onTogglePin} />
        )}

        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelectChange(todo._id, e.target.checked)}
        />
      </div>

      <div>
        <h5 className="card-title">{todo.title}</h5>
        <h6 className="card-subtitle py-2 text-muted">{todo.description}</h6>
      </div>

      <div className="mt-auto d-flex justify-content-between align-items-center">
        <p className="card-text text-sm mb-0">
          {moment(todo.time).format("ddd DD-MM-YYYY (hh:mm A)")}
        </p>
      </div>

      <div className="mt-2 d-flex">
        <Button
          type="primary"
          danger
          className="w-50 mr-2"
          onClick={onDelete}
          disabled={deleting || isTodoBeingPinned}
        >
          {deleting ? <Spin size="small" /> : "Delete"}
        </Button>
        <Button
          type="primary"
          onClick={onEditClick}
          disabled={isTodoBeingPinned || deleting}
          className="w-50"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TodoCardBody;
