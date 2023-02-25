import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

export default function TimeAgo({ timeStamp }) {
  return (
    <span className="ms-4 text-black-50 fst-italic">
      {formatDistanceToNow(parseISO(timeStamp))} ago
    </span>
  );
}
