"use client";

// Importamos los hooks necesarios de React
import { useState, useEffect } from "react";
import EloxAppIcon from "@/../public/icons/elox-app-icon";

// Definición de la interfaz de propiedades para el componente
interface Props {
  backLink?: {
    href: string;
    label: string;
  };
}

// Array con la información de cada slide
const slides = [
  {
    image:
      "https://www.ozokart.com/cdn/shop/collections/Image.png?v=1717145898",
    title: "Sistema de Gestión",
    subtitle: "Control de accesos inteligente",
  },
  {
    image:
      "https://www.ozsmartthings.com.au/cdn/shop/files/Screenshot2024-02-14110226.png?v=1707880312",
    title: "Plataforma Segura",
    subtitle: "Administración centralizada",
  },
  {
    image:
      "https://www.ozsmartthings.com.au/cdn/shop/files/Screenshot2024-02-14110212.png?v=1707880313",
    title: "Experiencia Intuitiva",
    subtitle: "Diseñada para facilitar tu trabajo",
  },
];

export default function CardSlider({ backLink }: Props) {
  // Estado para controlar qué slide se muestra actualmente
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para cambiar automáticamente entre slides cada 5 segundos
  useEffect(() => {
    // Configuramos un intervalo para rotar los slides
    const interval = setInterval(() => {
      // Actualizamos el índice actual, volviendo al principio cuando llegamos al final
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    // Función de limpieza para eliminar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  // Función para cambiar manualmente a un slide específico
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    // Contenedor principal con degradado de fondo
    <div className="relative max-h-dvh-30 lg:h-full w-full bg-gradient-to-br from-slate-800 to-slate-600 lg:w-1/2 dark:from-slate-950 dark:to-slate-800">
      {/* Cabecera comentada - podría utilizarse para mostrar un logo y un enlace
			de retorno */}
      <header className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-6 py-4 lg:px-10">
        {/* <div className='font-bold  rounded-md text-white text-xl tracking-wide p-2 mt-4'>
					<EloxAppIcon className='w-10 h-10 -p-1' />
				</div> */}
        {/* {backLink && (
					<a
						href={backLink.href}
						className='flex items-center text-xs font-normal text-white/60 hover:text-white/90 transition-colors px-2 py-1 rounded-full bg-white/5 hover:bg-white/10'>
						<span>{backLink.label}</span>
						<span className='ml-0.5'>→</span>
					</a>
				)} */}
      </header>
      {/* Contenedor flexible que organiza el contenido */}
      <div className="relative flex h-full flex-col justify-between p-6 lg:p-10">
        {/* Generamos las imágenes de fondo para cada slide */}
        {slides.map((slide, index) => (
          <div
            key={`slide-bg-${index}`}
            className={`absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-30" : "opacity-0"
            }`}
            style={{
              // Aplicamos un degradado oscuro sobre la imagen para mejorar la legibilidad del texto
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.image})`,
              backgroundBlendMode: "darken",
            }}
          />
        ))}

        {/* Contenedor para el texto de cada slide */}
        <div className="relative mt-auto text-left">
          {slides.map((slide, index) => (
            <div
              key={`slide-content-${index}`}
              className={`transition-opacity duration-700 ${
                // Mostramos solo el contenido del slide actual
                index === currentIndex
                  ? "opacity-100"
                  : "absolute top-0 left-0 opacity-0"
              }`}
            >
              <EloxAppIcon className="mb-4 h-4 w-4 lg:h-8 lg:w-8" />
              <h2 className="mb-0.5 text-lg font-bold text-white md:mb-2 lg:text-3xl dark:text-white/70">
                {slide.title}
              </h2>
              <p className="text-xs text-white/80 lg:text-lg dark:text-white/60 md:dark:text-white/60">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Indicadores/botones para navegar entre slides */}
        <div className="relative mt-3 flex gap-1.5 md:mt-4 md:gap-2">
          {slides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al slide ${index + 1}`}
              className={`h-1.5 w-4 -skew-x-12 cursor-pointer rounded-sm transition-colors md:h-2 md:w-6 ${
                // Destacamos visualmente el indicador del slide actual
                index === currentIndex
                  ? "bg-white/80 dark:bg-white/60"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
