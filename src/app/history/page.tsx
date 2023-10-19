import Header from '@/components/pages/header';
import { Contacts, DeleteContactBtn } from '@/components/pages/history/client';
import { Trash2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Wa Chat - History',
};

export default function page() {
	return (
		<>
			<Header />
			<main>
				<section>
					<div className='w-maxi mx-auto py-5'>
						<div className='flex items-center justify-between mb-3'>
							<h2 className='text-2xl'>History</h2>
							<DeleteContactBtn>
								<Trash2 size={36} className='bg-red-500 text-background rounded-full p-2 hover:scale-105 duration-200' />
							</DeleteContactBtn>
						</div>
						<div>
							<Contacts />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
