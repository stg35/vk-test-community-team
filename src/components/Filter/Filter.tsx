import { Select } from '@vkontakte/vkui';
import { FilterOptions } from '../../types/filter';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import styles from './filter.module.scss';

interface FilterProps {
	setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
	colors: Array<string>;
}

export const Filter = ({ setFilters, colors }: FilterProps): JSX.Element => {
	const { control, watch, handleSubmit } = useForm<FilterOptions>({
		defaultValues: {
			groupType: 'all',
			avatarColor: 'all',
			withFriends: 'yes',
		},
	});

	const onSubmit: SubmitHandler<FilterOptions> = async (data) => {
		setFilters(data);
	};

	useEffect(() => {
		const subscription = watch(() => handleSubmit(onSubmit)());
		return () => subscription.unsubscribe();
	}, [handleSubmit, watch]);

	return (
		<div className={styles['filter-container']}>
			<div className={styles['filter-container__item']}>
				<label htmlFor="select-id">Тип приватности</label>
				<Controller
					name="groupType"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							id="select-id"
							placeholder="Не выбран"
							options={[
								{ label: 'Любой', value: 'all' },
								{ label: 'Открытая', value: 'open' },
								{ label: 'Закрытая', value: 'closed' },
							]}
						/>
					)}
				/>
			</div>
			<div className={styles['filter-container__item']}>
				<label htmlFor="select-id">Цвет аватарки</label>
				<Controller
					name="avatarColor"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							id="select-id"
							placeholder="Не выбран"
							options={[
								{
									label: 'Любой',
									value: 'all',
								},
								...colors.map((color) => {
									return {
										label: color,
										value: color,
									};
								}),
							]}
						/>
					)}
				/>
			</div>
			<div className={styles['filter-container__item']}>
				<label htmlFor="select-id">Наличие друзей</label>
				<Controller
					name="withFriends"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							id="select-id"
							placeholder="Не выбран"
							options={[
								{ label: 'Да', value: 'yes' },
								{ label: 'Нет', value: 'no' },
							]}
						/>
					)}
				/>
			</div>
		</div>
	);
};
