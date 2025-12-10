'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RoundThemeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<div className='absolute top-4 right-4'>
			<Button
				variant='outline'
				size='icon'
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className='rounded-full'>
				{theme === 'dark' ? (
					<Sun className='h-5 w-5' />
				) : (
					<Moon className='h-5 w-5' />
				)}
			</Button>
		</div>
	);
}
