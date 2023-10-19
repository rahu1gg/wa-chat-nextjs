type Key = {
	contacts: string;
};

export function getLocalStore(key: keyof Key) {
	const val = localStorage.getItem(key);

	if (val === null) {
		setLocalStore(key, '');
		return getLocalStore(key);
	}

	return val;
}

export function setLocalStore(key: keyof Key, payload: string) {
	localStorage.setItem(key, payload);
	return true;
}
