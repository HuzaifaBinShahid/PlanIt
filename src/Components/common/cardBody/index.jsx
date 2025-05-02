import React from "react";
import { Spin } from "antd";
import moment from "moment";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";

import PinToggleIcon from "../PinIcon";

const TodoCardBody = ({
  todo,
  onTogglePin,
  onEditClick,
  onDelete,
  deleting,
  isTodoBeingPinned,
}) => {
  return (
    <div
      className="card-body text-dark d-flex flex-column"
      style={{ backgroundColor: "#F8F4E1", overflow: "hidden" }}
    >
      <div className="d-flex justify-content-between">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "8px",
            zIndex: 1,
          }}
        >
          {isTodoBeingPinned ? (
            <Spin indicator={<LoadingOutlined spin />} />
          ) : (
            <PinToggleIcon isPinned={todo.isPinned} onToggle={onTogglePin} />
          )}
        </div>

        <div>
          <h5 className="card-title">{todo.title}</h5>
          <h6 className="card-subtitle py-2 text-muted">{todo.description}</h6>
        </div>
      </div>

      <div className="mt-auto d-flex justify-content-between">
        <p className="card-text text-sm mr-1">
          {moment(todo.time).format("ddd DD-MM-YYYY (hh:mm A)")}
        </p>
        <div>
          <EditOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={onEditClick}
            disabled={isTodoBeingPinned || deleting}
          />
        </div>
      </div>
      <button
        className="btn btn-sm btn-danger w-100"
        onClick={onDelete}
        disabled={deleting || isTodoBeingPinned}
      >
        {deleting ? <Spin size="small" /> : "Delete"}
      </button>
    </div>
  );
};

export default TodoCardBody;
