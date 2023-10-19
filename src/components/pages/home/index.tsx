import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TelNumberForm from './tel-number-form';

export default function Home() {
	return (
		<main>
			<section>
				<div className='w-maxi mx-auto py-5 min-h-dvh flex items-center justify-center flex-col'>
					<div className='w-full'>
						<TelNumberForm />
					</div>
					<div className='h-full mt-auto w-full'>
						<Button className='w-full py-9 rounded-full' variant='outline' type='button' asChild>
							<Link href='/history'>History</Link>
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
