import React from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import 'antd/dist/antd.css'

interface Option {
	text: string
	value: string
}

const TableViewPicker = ({
	defaultValue,
	options,
	onChange,
	...rest
}: {
	defaultValue: Option
	options: Option[]
	onChange: (event: RadioChangeEvent) => void
}) => {
	return (
		<div>
			<Radio.Group defaultValue={defaultValue.value} {...rest} onChange={onChange}>
				{options.map((opt) => (
					<Radio.Button key={opt.value} value={opt.value}>
						{opt.text}
					</Radio.Button>
				))}
			</Radio.Group>
		</div>
	)
}

export default TableViewPicker
