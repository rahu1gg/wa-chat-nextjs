import NextThemesProvider from '@/client/provider/next-theme';
import type { Metadata } from 'next';
import { Aldrich, Nunito } from 'next/font/google';
import '../styles/main.scss';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const aldrich = Aldrich({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-aldrich',
});

export const metadata: Metadata = {
	title: 'Wa Chat - Home',
	description: 'A Next.js app used to open WhatsApp chat',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${nunito.className} ${nunito.variable} ${aldrich.variable}`}>
				<NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
				</NextThemesProvider>
			</body>
		</html>
	);
}
