export interface IGetGroupsResponse {
	result: 1 | 0;
	data?: IGroup[];
}

export interface IGroup {
	id: number;
	name: string;
	closed: boolean;
	avatar_color?: string;
	members_count: number;
	friends?: IUser[];
}
