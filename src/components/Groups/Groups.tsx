import { Group, Header } from '@vkontakte/vkui';
import { IGroup } from '../../types/group';
import { GroupCell } from '../GroupCell/GroupCell';
import { Filter } from '../Filter/Filter';
import { useState } from 'react';
import { FilterOptions } from '../../types/filter';
import styles from './groups.module.scss';

interface GroupsProps {
	groups: IGroup[];
}

export const Groups = ({ groups }: GroupsProps): JSX.Element => {
	const [filters, setFilters] = useState<FilterOptions>({
		groupType: 'all',
		avatarColor: 'all',
		withFriends: 'yes',
	});

	const colors: Array<string> = [
		...new Set(
			groups
				.map((group) => {
					if (group.avatar_color !== undefined) {
						return group.avatar_color;
					}
					return '';
				})
				.filter((group) => group !== ''),
		),
	];

	return (
		<>
			<Filter setFilters={setFilters} colors={colors} />
			<Group className={styles['group']} header={<Header mode="secondary">Группы</Header>}>
				{groups &&
					groups
						.filter((group) => {
							if (filters.groupType === 'closed') {
								return group.closed === true;
							} else if (filters.groupType === 'open') {
								return group.closed === false;
							} else {
								return true;
							}
						})
						.filter((group) => {
							if (filters.avatarColor !== 'all') {
								return group.avatar_color === filters.avatarColor;
							}
							return true;
						})
						.filter((group) => {
							if (filters.withFriends === 'yes') {
								return group.friends && group.friends.length > 0;
							}
							return !group.friends;
						})
						.map((group) => (
							<GroupCell
								key={group.id}
								name={group.name}
								closed={group.closed}
								members_count={group.members_count}
								avatar_color={group.avatar_color}
								friends={group.friends}
							></GroupCell>
						))}
			</Group>
		</>
	);
};
