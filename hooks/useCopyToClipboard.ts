import { useState } from "react";

const useCopyToClipboard = (timeout: number = 2000) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), timeout); // Reset `copied` after the timeout
  };

  return { copied, handleCopy };
};

export default useCopyToClipboard;
