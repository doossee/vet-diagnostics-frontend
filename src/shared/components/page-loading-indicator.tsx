"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export const PageLoadingIndicator = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathnameRef = useRef(pathname);
  const previousSearchParamsRef = useRef(searchParams.toString());

  useEffect(() => {
    // Отслеживаем клики по ссылкам для раннего старта прогресса
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href && !link.hasAttribute("download")) {
        try {
          const url = new URL(link.href);
          const currentUrl = window.location;
          
          // Проверяем, что это не внешняя ссылка и не якорь
          if (
            url.origin === currentUrl.origin &&
            (url.pathname !== currentUrl.pathname || url.search !== currentUrl.search)
          ) {
            // Начинаем прогресс сразу при клике
            if (progressRef.current) {
              clearInterval(progressRef.current);
            }
            
            setProgress(10);
            
            // Начинаем прогресс с анимацией (как в Nuxt)
            const interval = setInterval(() => {
              setProgress((prev) => {
                if (prev >= 90) {
                  clearInterval(interval);
                  return 90;
                }
                // Увеличиваем прогресс с замедлением
                const increment = Math.random() * 10 + 5;
                return Math.min(prev + increment, 90);
              });
            }, 120);
            
            progressRef.current = interval;
          }
        } catch {
          // Игнорируем ошибки парсинга URL
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    const currentSearchParams = searchParams.toString();
    const pathnameChanged = previousPathnameRef.current !== pathname;
    const searchParamsChanged = previousSearchParamsRef.current !== currentSearchParams;

    // Когда маршрут или параметры изменились
    if (pathnameChanged || searchParamsChanged) {
      previousPathnameRef.current = pathname;
      previousSearchParamsRef.current = currentSearchParams;
      
      // Очищаем предыдущие таймеры
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }

      // Завершаем прогресс
      setProgress(100);
      
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Скрываем прогресс-бар через небольшую задержку
      timerRef.current = setTimeout(() => {
        setProgress(0);
      }, 200);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [pathname, searchParams]);

  if (progress === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-background/50 z-[9999] pointer-events-none">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out relative shadow-lg"
        style={{
          width: `${progress}%`,
        }}
      >
        <div className="absolute inset-0 bg-primary/30 blur-sm" />
      </div>
    </div>
  );
};
