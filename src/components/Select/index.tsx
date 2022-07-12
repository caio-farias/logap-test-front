import React from 'react'
import { Field, ErrorMessage } from 'formik'
import './index.scss'

const Select = ({
	modifier = 'common',
	selected = '',
	options,
	label,
	name,
	valueKey = 'id',
	optionKey = 'name',
	...rest
}: {
	modifier?: string
	selected: string
	options: any[]
	label: string
	name: string
	valueKey?: string
	optionKey?: string
}) => (
	<div className={`select-wrapper select-wrapper--${modifier}`}>
		<label className="select-label" htmlFor={name}>
			{label}
		</label>
		{modifier === 'calendar' && <div className="calendar-icon" />}
		<Field className="select" as="select" name={name} {...rest}>
			{selected && (
				<option value={selected} key={selected}>
					{selected}
				</option>
			)}
			{options.map((option) => (
				<option value={option[valueKey]} key={option[valueKey]}>
					{option[optionKey]}
				</option>
			))}
		</Field>
		<ErrorMessage className={`text-input-error--${modifier}`} component="span" name={name} />
	</div>
)

export default Select
