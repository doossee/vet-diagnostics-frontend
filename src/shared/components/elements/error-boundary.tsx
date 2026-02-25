"use client";

import { useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { useAuthData } from "@/shared/hooks/use-auth-data";
import { sendMessageToTelegram } from "@/shared/helpers/send-message-to-tg";
import {
  cleanPageUrl,
  extractFilePath,
  simplifyBrowser,
  translateType,
} from "@/shared/helpers/tg-report-helpers";

export function ErrorSender() {
  const { userData } = useAuthData();
  const sendErrorRef = useRef<((data: any) => void) | null>(null);

  useEffect(() => {
    sendErrorRef.current = debounce(async (data) => {
      try {
        const message = {
          user: `${userData?.userId} <${userData?.role}>`,
          message: data.message,
          file: extractFilePath(data.file) + ":" + data.line,
          page: cleanPageUrl(window.location.href),
          browser: simplifyBrowser(navigator.userAgent),
          os: navigator.platform,
          screen: `${window.innerWidth}x${window.innerHeight}`,
          lang: navigator.language,
          type: translateType(data.type),
        };

        await sendMessageToTelegram(message);
      } catch (err) {
        console.warn("Ошибка при отправке отчёта в Telegram:", err);
      }
    }, 1000);

    return () => {
      (sendErrorRef.current as any)?.cancel();
    };
  }, [userData]);

  const handleError = (event: ErrorEvent) => {
    sendErrorRef.current?.({
      type: "runtime",
      message: event.error?.message || event.message,
      file: event.filename,
      line: `${event.lineno}:${event.colno}`,
      stack: event.error?.stack,
    });
  };

  const handleRejection = (event: PromiseRejectionEvent) => {
    sendErrorRef.current?.({
      type: "promise",
      message: event.reason?.message || "Unhandled Promise rejection",
      stack: event.reason?.stack,
    });
  };

  useEffect(() => {
    window.addEventListener("error", handleError);
    // window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      // window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
