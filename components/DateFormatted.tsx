import React from "react";
import { format } from "date-fns";

const DateFormatted = ({ dateString }: { dateString: string }) => {
  return <span>{format(new Date(dateString), "d. MMM yyyy, HH:mm")}</span>;
};

export default DateFormatted;
