import { TTask } from '../types';

export const fetchData = async (url: string): Promise<TTask[]> => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};
