import { AppRoot } from '@vkontakte/vkui';
import { Groups } from './components/Groups/Groups';
import { IGroup } from './types/group';
import { useEffect, useState } from 'react';
import { getGroups } from './api/group';

function App() {
	const [data, setData] = useState<IGroup[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await getGroups();
			if (res.result && res.data) {
				setData(res.data);
			} else {
				throw new Error('fetch failed');
			}
		};

		fetchData();
	}, []);

	return (
		<AppRoot>
			<Groups groups={data} />
		</AppRoot>
	);
}

export default App;
