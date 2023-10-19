import Link from 'next/link';

export default function Footer() {
	return (
		<footer>
			<div className='w-maxi mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
					Built by <Link href={'/'}>Rahul Palamarthi</Link>
				</p>
			</div>
		</footer>
	);
}
