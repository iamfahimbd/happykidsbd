"use client";

import { useEffect } from "react";

export default function useClickOutside(
  ref,
  callback,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function handleClick(event) {
      if (!ref.current) return;

      if (!ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener(
      "click",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [ref, callback, enabled]);
}