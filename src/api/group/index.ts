import { IGetGroupsResponse } from '../../types/group';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getGroups = async (): Promise<IGetGroupsResponse> => {
	try {
		const res = await fetch('../../../mock/groups.json');
		const data = await res.json();
		await delay(1000);

		if (data) {
			return {
				result: 1,
				data: data,
			};
		} else {
			return {
				result: 0,
			};
		}
	} catch {
		return {
			result: 0,
		};
	}
};
