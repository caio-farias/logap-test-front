import React from 'react'
import { Field, ErrorMessage } from 'formik'
import './index.scss'

const TextInput = ({
	modifier = 'common',
	label,
	name,
	type = 'text',
	error,
	...rest
}: {
	modifier?: string
	label: string
	name: string
	type?: string
	error: string
}) => (
	<div className={`text-input-wrapper text-input-wrapper--${modifier}`}>
		<label className={`text-input-label--${modifier}`} htmlFor={name}>
			{label}
		</label>
		<Field className={`text-input--${modifier}`} name={name} type={type} {...rest} />
		<ErrorMessage className={`text-input-error--${modifier}`} component="span" name={name} />
	</div>
)

export default TextInput
