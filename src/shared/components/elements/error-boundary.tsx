"use client";

import { useEffect } from 'react';
import { useAuthData } from '@/shared/hooks/use-auth-data';
// import { sendMessageToTelegram } from "@/shared/helpers/send-message-to-tg";
import { cleanPageUrl, extractFilePath, simplifyBrowser, translateType } from '@/shared/helpers/tg-report-helpers';

export function ErrorSender() {
  const { userData } = useAuthData()

  const sendError = async (data: Record<string, any>) => {
    try {
      const message = {
        user: `${userData?.userId} <${userData?.role}>`,
        message: data.message,
        file: extractFilePath(data.file) + ':' + data.line,
        line: data.line,
        page: cleanPageUrl(window.location.href),
        browser: simplifyBrowser(navigator.userAgent),
        os: navigator.platform,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        lang: navigator.language,
        // stack: data.stack,
        type: translateType(data.type)
      }
      console.log(message);
      // await sendMessageToTelegram({
      //   user: `${userData?.userId} <${userData?.role}>`,
      //   message: data.message,
      //   file: extractFilePath(data.file) + ':' + data.line,
      //   line: data.line,
      //   page: cleanPageUrl(window.location.href),
      //   browser: simplifyBrowser(navigator.userAgent),
      //   os: navigator.platform,
      //   screen: `${window.innerWidth}x${window.innerHeight}`,
      //   lang: navigator.language,
      //   // stack: data.stack,
      //   type: translateType(data.type)
      // })
    } catch (err) {
      console.warn("Ошибка при отправке отчёта в Telegram:", err);
    }
  };

  const handleError = (event: ErrorEvent) => {
    sendError({
      type: "runtime",
      message: event.error?.message || event.message,
      file: event.filename,
      line: `${event.lineno}:${event.colno}`,
      stack: event.error?.stack,
    });
  };

  const handleRejection = (event: PromiseRejectionEvent) => {
    sendError({
      type: "promise",
      message: event.reason?.message || "Unhandled Promise rejection",
      stack: event.reason?.stack,
    });
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, [])

  return null
}