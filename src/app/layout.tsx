import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/styles/globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'ELOX',
	description: 'Gestion de accesos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
				suppressHydrationWarning>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
