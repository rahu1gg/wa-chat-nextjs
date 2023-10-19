'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dailCodes } from '@/constants/dail-codes';
import { waUrl } from '@/constants/wa-chat';
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
	country: z.string({ required_error: 'Country Required' }),
	tel: z.coerce.string().refine(
		(val) => {
			if (val === '') {
				return false;
			}
			if (isNaN(Number(val))) {
				return false;
			}
			return true;
		},
		{ message: 'Number Required' },
	),
});

type FormSchema = z.infer<typeof formSchema>;

export default function TelNumberForm() {
	const waRef = useRef<HTMLAnchorElement>(null);
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			country: (() => {
				const val = dailCodes.find((dailCodes) => dailCodes.code.toLowerCase() === '91');
				return `${val?.code}_${val?.country}`;
			})(),
			tel: '',
		},
	});

	function onSubmit(formData: FormSchema) {
		console.log(formData);
		const [code] = formData.country.split('_');
		waRef.current!.href = `${waUrl}${code}${formData.tel}/?text=Hey...`;
		waRef.current!.click();
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='input'
												role='combobox'
												className={cn('w-full justify-between py-9 px-9 rounded-full shadow-none', !field.value && 'text-muted-foreground')}
											>
												{field.value
													? dailCodes.find((dailCode) => `${dailCode.code}_${dailCode.country}` === field.value)?.country
													: 'Select country'}
												<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0 rounded-xl' sideOffset={8}>
										<Command className='rounded-xl'>
											<CommandInput placeholder='Search country...' className='h-9 my-2 mx-1' />
											<CommandEmpty>No country found.</CommandEmpty>
											<CommandGroup className='overflow-y-scroll w-full h-64'>
												{dailCodes.map((dailCode) => (
													<CommandItem
														key={dailCode.country}
														value={`${dailCode.code}_${dailCode.country}`}
														onSelect={() => {
															form.setValue('country', `${dailCode.code}_${dailCode.country}`);
														}}
														className='p-2.5 rounded-lg'
													>
														<p className='flex items-center justify-start gap-3'>
															<span className='font-aldrich'>+{dailCode.code}</span>
															<span>{dailCode.country}</span>
														</p>
														<CheckIcon className={cn('ml-auto h-4 w-4', dailCode.code === field.value ? 'opacity-100' : 'opacity-0')} />
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tel'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										className='py-9 px-9 rounded-full font-aldrich placeholder:font-nunito'
										placeholder='Tel number'
										type='number'
										pattern='[0-9]+'
										inputMode='numeric'
										autoComplete='off'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full py-9 rounded-full font-bold' type='submit'>
						Submit
					</Button>
				</form>
			</Form>
			<a ref={waRef} className='hidden' href={waUrl} data-tag='wa-chat-link' target='_blank' rel='noreferrer'>
				{' '}
			</a>
		</>
	);
}
