import React from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import { TextInput } from '../../components'
import { Button, Spin } from 'antd'
import * as yup from 'yup'
import './index.scss'

export interface RegisterProductCategoryFormValues {
	id?: string
	name: string
}

const validation = yup.object().shape({
	name: yup.string().required('Nome é um campo obrigatório'),
})

export const RegisterProductCategoryForm = ({
	initialValues,
	onSubmit,
	actionName = 'Cadastrar',
}: {
	initialValues: RegisterProductCategoryFormValues
	onSubmit: (
		values: RegisterProductCategoryFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductCategoryFormValues>
	) => void
	actionName?: string
}) => {
	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
				{({ isSubmitting }) => (
					<Form aria-readonly={isSubmitting}>
						<TextInput label="Nome" name="name" error="" />
						<Button htmlType="submit">
							{actionName} {isSubmitting && <Spin className="spin" />}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default RegisterProductCategoryForm
