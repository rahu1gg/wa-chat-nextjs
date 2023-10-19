type Key = {
	contacts: string;
};

export function getLocalStorage(key: keyof Key, initialValue?: string) {
	if (typeof window === 'undefined') return '';

	const val = localStorage.getItem(key);

	if (val === null && initialValue) {
		setLocalStorage(key, initialValue);
		return localStorage.getItem(key);
	}

	return val;
}

export function setLocalStorage(key: keyof Key, payload: string) {
	localStorage.setItem(key, payload);
	return true;
}
