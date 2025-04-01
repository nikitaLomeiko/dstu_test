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
  const ref = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const { root = null, rootMargin = "0px", threshold = 0, triggerOnce = false, onIntersect } = options || {};

    // Функция обработки пересечения
    const handleIntersect: IntersectionObserverCallback = ([entry]) => {
      const isElementIntersecting = entry.isIntersecting;

      // Если передан callback для custom обработки
      if (onIntersect) {
        onIntersect(isElementIntersecting);
      }

      // Обновляем состояние
      setIsIntersecting(isElementIntersecting);

      // Останавливаем наблюдение, если element пересек экран и triggerOnce активирован
      if (isElementIntersecting && triggerOnce && observerRef.current) {
        observerRef.current.disconnect();
      }
    };

    // Создаем новый IntersectionObserver
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    const currentRef = ref.current;
    // Начинаем отслеживание, если ref на элемент существует
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    // Очищаем наблюдателя при размонтировании компонента
    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [options]); // Эффект срабатывает при изменении опций

  return [ref, isIntersecting];
};
