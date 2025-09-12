import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsCleint] = useState(false);

  useEffect(() => {
    setIsCleint(true);
  }, []);

  return isClient;
}
