'use client';

import { Whatsapp } from '@/components/custom/svg/whatsapp';
import { WA_URL } from '@/constants/wa-chat';
import { getLocalStorage, setLocalStorage } from '@/lib/utils/local-storage';
import { Phone } from 'lucide-react';
import { Fragment, ReactNode, useEffect, useState } from 'react';

export function DeleteContactBtn({ children }: { children: ReactNode }) {
	return (
		<button type='button' onClick={() => setLocalStorage('contacts', JSON.stringify([]))}>
			{children}
		</button>
	);
}

export function Contacts() {
	const [contacts, setContacts] = useState<string[]>([]);
	const localContacts = getLocalStorage('contacts', JSON.stringify([]));

	if (!localContacts) return null;

	const parsedContacts: string[] = JSON.parse(localContacts);

	useEffect(() => {
		setContacts(parsedContacts);
	}, [parsedContacts]);

	return (
		<Fragment>
			{contacts.map((contact, index) => (
				<div key={`${index}`} className='py-3 font-aldrich rounded-full flex items-center justify-between'>
					<p>+{contact}</p>
					<div className='flex items-center justify-center gap-5'>
						<a href={`${WA_URL}/${contact}?text=Hey...`} className='hover:scale-105 duration-200' target='_blank' rel='noreferrer'>
							<Whatsapp />
						</a>
						<a href={`tel:${contact}`} className='hover:scale-105 duration-200' target='_blank' rel='noreferrer'>
							<Phone size={18} className='stroke-foreground' />
						</a>
					</div>
				</div>
			))}
		</Fragment>
	);
}
