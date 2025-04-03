import { useEffect, useRef, useState } from "react";

type IntersectionObserverOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  onIntersect?: (isIntersecting: boolean) => void;
};

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverOptions
): [React.RefObject<T | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false); // Флаг для игнорирования первого вызова
  const ref = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const { root = null, rootMargin = "0px", threshold = 0, triggerOnce = false, onIntersect } = options || {};

    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      const isElementIntersecting = entry.isIntersecting;

      // Игнорируем первый вызов
      if (!hasIntersected) {
        setHasIntersected(true);
        return;
      }

      // Вызываем пользовательский коллбэк
      if (onIntersect) {
        onIntersect(isElementIntersecting);
      }

      // Обновляем состояние
      setIsIntersecting(isElementIntersecting);

      // Останавливаем наблюдение, если triggerOnce активирован
      if (isElementIntersecting && triggerOnce && observerRef.current) {
        observerRef.current.disconnect();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [options, hasIntersected]); // Добавили зависимость от `hasIntersected`

  return [ref, isIntersecting];
};
