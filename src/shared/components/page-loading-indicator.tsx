'use client'

import Router from "next/router";
import { useState, useEffect } from "react";

export const PageLoadingIndicator = () => {
  const [loading, setLoading] = useState(false);

  const handleRouteChangeStart = () => setLoading(true);
  const handleRouteChangeComplete = () => setLoading(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-primary z-[9999] transition-all duration-300 ${loading ? 'w-full' : 'w-0'}`}/>
  )
}