"use client";

import { useEffect } from "react";

export default function Refresh() {
  useEffect(() => {
    const timerId = setInterval(() => {
      window.location.reload();
    }, 30000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  return <div></div>;
}
