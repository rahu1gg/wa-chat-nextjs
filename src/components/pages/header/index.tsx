import Link from 'next/link';
import { ToggleTheme } from './toggle-themes';

export default function Header() {
	return (
		<header className='font-medium'>
			<div className='w-maxi mx-auto h-16 flex items-center justify-between relative before:content-[""] before:absolute before:w-full before:h-0.5 before:bg-gradient-to-r before:from-primary to-background before:left-0 before:bottom-0'>
				<div>
					<Link href='/' className='p-2 relative -left-2'>
						Wa Chat
					</Link>
				</div>
				<div>
					<ToggleTheme />
				</div>
			</div>
		</header>
	);
}
