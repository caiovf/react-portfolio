import { useEffect, useState } from "react";

/**
 * Componente utilitário para renderizar conteúdo apenas no cliente.
 * Útil para evitar erros de hidratação em componentes que dependem do window ou DOM, como o Swiper.
 */
export function ClientOnly({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
}
