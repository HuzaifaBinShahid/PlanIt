import React from "react";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";

const PinToggleIcon = ({ isPinned, onToggle, style = {} }) => {
  return isPinned ? (
    <PushpinFilled
      style={{ fontSize: "20px", cursor: "pointer", color: "#ff9800", ...style }}
      onClick={onToggle}
    />
  ) : (
    <PushpinOutlined
      style={{ fontSize: "20px", cursor: "pointer", color: "#999", ...style }}
      onClick={onToggle}
    />
  );
};


export default PinToggleIcon;
