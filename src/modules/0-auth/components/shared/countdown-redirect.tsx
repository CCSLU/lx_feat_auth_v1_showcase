'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CountdownRedirect({
  showCountdown,
  redirectTimeoutSeconds,  
  redirectPath,
  destinationName = 'inicio de sesión'
}: {
  showCountdown: boolean;
  redirectTimeoutSeconds: number;
  redirectPath: string;
  destinationName?: string;
}) {
  // Estado para la cuenta regresiva de redirección
  const [secondsRemaining, setSecondsRemaining] = useState(redirectTimeoutSeconds);
  const router = useRouter();

  // Efecto para la cuenta regresiva y redirección automática
  useEffect(() => {
    if (showCountdown && secondsRemaining > 0) {
      // Configura un temporizador para decrementar la cuenta regresiva
      const timer = setTimeout(() => setSecondsRemaining(secondsRemaining - 1), 1000);
      // Limpia el temporizador cuando el componente se desmonta
      return () => clearTimeout(timer);
    } else if (showCountdown && secondsRemaining <= 0) {
      // Redirige cuando la cuenta llega a cero
      router.push(redirectPath);
    }
  }, [secondsRemaining, router, redirectPath, showCountdown]);

  if (!showCountdown) return null;
  return (
    <div className='text-sm font-medium text-muted-foreground mb-6 bg-background/50 px-4 py-2 rounded-full'>
      Serás redirigido a <span className='font-bold text-primary'>{destinationName}</span> en{' '}
      <span className='font-bold'>{secondsRemaining}</span> segundos
    </div>
  );
}