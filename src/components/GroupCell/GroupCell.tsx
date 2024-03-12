import { Group, Header, SimpleCell, Text } from '@vkontakte/vkui';
import styles from './groupCell.module.scss';
import { useState } from 'react';
import { IGroup } from '../../types/group';

interface GroupCellProps extends Omit<IGroup, 'id'> {}

export const GroupCell = ({
	name,
	closed,
	avatar_color,
	members_count,
	friends,
}: GroupCellProps) => {
	const [showFriends, setShowFriends] = useState<boolean>();

	return (
		<div className={styles['cell']}>
			<SimpleCell
				before={<div className={styles['avatar']} style={{ backgroundColor: avatar_color }}></div>}
				subtitle={closed ? 'Закрытая' : 'Открытая'}
				after={
					<div className={styles['subs-group']}>
						<div className={styles['subs-group__col']}>
							<Text>Кол-во подписчиков</Text>
							<Text>{members_count}</Text>
						</div>
						<div className={styles['subs-group__col']}>
							<Text>Кол-во друзей</Text>
							<Text>{friends ? friends.length : 0}</Text>
						</div>
					</div>
				}
				onClick={() => setShowFriends(!showFriends)}
				hasHover={friends !== undefined}
			>
				{name}
			</SimpleCell>
			{friends && showFriends && (
				<Group header={<Header mode="secondary">Друзья</Header>} mode="plain">
					{friends.map((friend, id) => (
						<Text key={id}>{friend.first_name + ' ' + friend.last_name}</Text>
					))}
				</Group>
			)}
		</div>
	);
};
