"use client";

import { formatDate } from "@/util/date";
import { useFormatter } from "next-intl";
import { useEffect, useState } from "react";

interface TimerProps {
  date: Date;
}
function Timer({ date }: TimerProps) {
  const [formattedTime, setFormattedTime] = useState("");
  const f = useFormatter();
  useEffect(() => {
    const formatTime = () => {
      setFormattedTime(
        // formatDistanceToNow(date, { addSuffix: true })
        //   .replace("less than a minute", "1m")
        //   .replace("about a minute", "1m")
        //   .replace("minutes", "m")
        //   .replace("minute", "m")
        //   .replace("about an hour", "1h")
        //   .replace("hours", "h")
        //   .replace("hour", "h")
        //   .replace("about", "")
        //   .replace("a day", "1d")
        //   .replace("days", "d")
        //   .replace("day", "d")
        //   .replace("a month", "1mo")
        //   .replace("months", "mo")
        //   .replace("month", "mo")
        //   .replace("a year", "1y")
        //   .replace("years", "y")
        //   .replace("year", "y")
        //   .replace("less than", "<")
        f.relativeTime(date)
      );
    };

    formatTime();

    const interval = setInterval(formatTime, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <span title={formatDate(date)}>{formattedTime}</span>;
}

export default Timer;
