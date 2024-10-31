import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleStyle: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleStyle,
}: ArticleParamsFormProps) => {
	const [formOpen, setFormOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);

	// хук закрытия формы при клике не на ней
	useOutsideClickClose({
		isOpen: formOpen,
		rootRef: asideRef,
		onClose: () => setFormOpen(false),
		onChange: setFormOpen,
	});

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleStyle(defaultArticleState);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleStyle(formState);
	};

	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={() => setFormOpen(!formOpen)} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, formOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
