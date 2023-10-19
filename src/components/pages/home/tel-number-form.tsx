'use client';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DAIL_CODES } from '@/constants/dail-codes';
import { WA_URL } from '@/constants/wa-chat';
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
	country: z.string({ required_error: 'Country Required' }),
	tel: z.coerce.number({ required_error: 'Phone number required!', invalid_type_error: 'Phone number required!' }),
});

export default function TelNumberForm() {
	const waRef = useRef<HTMLAnchorElement>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			country: DAIL_CODES.find((dailCode) => dailCode.code.toLowerCase() === '91')?.code,
		},
	});

	function handleSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
		waRef.current!.href = `${WA_URL}${data.country}${data.tel}/?text=Hey...`;
		waRef.current!.click();
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
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
												{field.value ? DAIL_CODES.find((dailCode) => dailCode.code === field.value)?.country : 'Select country'}
												<CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0 rounded-xl' sideOffset={8}>
										<Command className='rounded-xl'>
											<CommandInput placeholder='Search country...' className='h-9 my-2 mx-1' />
											<CommandEmpty>No country found.</CommandEmpty>
											<CommandGroup className='overflow-y-scroll w-full h-64'>
												{DAIL_CODES.map((dailCode) => (
													<CommandItem
														key={dailCode.country}
														className='p-2.5 rounded-lg'
														value={`${dailCode.code}_${dailCode.country}`}
														onSelect={() => form.setValue('country', dailCode.code)}
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
										inputMode='numeric'
										autoComplete='off'
										{...field}
										value={field.value ?? ''}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full py-9 rounded-full font-bold' type='submit'>
						Open chat
					</Button>
				</form>
			</Form>
			<a ref={waRef} className='hidden' href={WA_URL} data-tag='wa-chat-link' target='_blank' rel='noreferrer'>
				{' '}
			</a>
		</>
	);
}
