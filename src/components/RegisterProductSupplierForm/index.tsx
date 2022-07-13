import React from 'react'
import * as yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'
import { TextInput } from '../../components'
import { Button, Spin } from 'antd'
import './index.scss'
export interface RegisterProductSupplierFormValues {
	id?: string
	name: string
	email: string
	mobileNumber: string
	address: string
}

const validation = yup.object().shape({
	name: yup.string().required('Nome é um campo obrigatório'),
	email: yup.string().email('E-mail inválido').required('E-mail é um campo obrigatório'),
	mobileNumber: yup.string().required('Número de telefone é um campo obrigatório'),
	address: yup.string().required('Endereço é um campo obrigatório'),
})

const RegisterProductSupplierForm = ({
	initialValues,
	onSubmit,
	actionName = 'Cadastrar',
}: {
	initialValues: RegisterProductSupplierFormValues
	onSubmit: (
		values: RegisterProductSupplierFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductSupplierFormValues>
	) => void
	actionName?: string
}) => {
	return (
		<div className="register-product-supplier-form ">
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
				{({ isSubmitting }) => (
					<Form>
						<TextInput label="Nome" name="name" error="" />
						<TextInput label="E-mail" name="email" type="email" error="" />
						<TextInput label="Número de telefone" type="tel" name="mobileNumber" error="" />
						<TextInput label="Endereço" name="address" error="" />
						<Button htmlType="submit">
							{actionName} {isSubmitting && <Spin className="spin" />}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default RegisterProductSupplierForm
