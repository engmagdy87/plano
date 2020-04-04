import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
export default function CustomTooltip({ children, operation }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top">{operation}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
}
