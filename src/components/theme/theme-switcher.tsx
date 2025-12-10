'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

// Tipos de temas disponibles
type Theme = 'light' | 'dark';

/**
 * Componente que permite alternar entre temas claro y oscuro
 * con una interfaz visual intuitiva y animaciones suaves.
 */
export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Previene problemas de hidratación esperando al montaje del cliente
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	// Configuración de temas disponibles
	const themeOptions: Array<{
		value: Theme;
		icon: React.ReactNode;
		label: string;
	}> = [
		{
			value: 'light',
			icon: (
				<Sun
					size={16}
					className='rounded-full'
				/>
			),
			label: 'Tema claro',
		},
		{
			value: 'dark',
			icon: (
				<Moon
					size={16}
					className='rounded-full'
				/>
			),
			label: 'Tema oscuro',
		},
	];

	return (
		<div className='flex gap-1 rounded-full h-fit w-fit border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700'>
			{themeOptions.map(({ value, icon, label }) => (
				<button
					key={value}
					type='button'
					onClick={() => setTheme(value)}
					aria-label={label}
					aria-pressed={theme === value}
					className={
						theme === value
							? 'h-6 w-6 inline-flex items-center justify-center rounded-full transition-colors bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
							: 'h-6 w-6 inline-flex items-center justify-center rounded-full transition-colors text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
					}>
					<div
						className='transition-transform duration-300 ease-in-out'
						style={{
							transform: theme === value ? 'scale(1.15)' : 'scale(1)',
						}}>
						{icon}
					</div>
					<span className='sr-only'>{label}</span>
				</button>
			))}
		</div>
	);
}
