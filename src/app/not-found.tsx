"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const handleGoBack = () => window.history.back();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  
  useEffect(() => {
    // Crear partículas aleatorias
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
    
    // Animar partículas
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed > 0 ? p.y - p.speed : 100,
        x: p.x + (Math.random() - 0.5) * 0.5
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900">
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute rounded-full bg-blue-500 dark:bg-blue-200 opacity-20 dark:opacity-15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
      <div className="relative z-10 flex h-full">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-8xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tighter">404</h1>
          <h2 className="text-3xl font-bold text-slate-700 dark:text-white/90 mb-6">
            Página No Encontrada
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/70 max-w-md mb-8">
            La página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          <Button 
            onClick={handleGoBack} 
            className="w-fit transition-all hover:translate-x-[-4px] font-bold text-primary-foreground dark:bg-[#00A6E2]" 
            variant="default"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver Atrás
          </Button>
        </div>
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <div className="relative w-64 h-64 rounded-full bg-blue-100/50 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center border border-blue-200 dark:border-blue-400/20">
            <div className="absolute w-48 h-48 rounded-full bg-blue-200/30 dark:bg-blue-500/5 animate-pulse"></div>
            <div className="text-9xl font-black text-blue-300/30 dark:text-white/15">?</div>
          </div>
        </div>
      </div>
    </div>
  );
}
