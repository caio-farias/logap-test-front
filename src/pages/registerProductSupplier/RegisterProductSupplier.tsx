import React, { useState } from 'react'
import { PageHeader } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FeedbackText, RegisterProductSupplierForm } from '../../components'
import { RegisterProductSupplierFormValues } from '../../components/RegisterProductSupplierForm'
import { FormikHelpers } from 'formik'
import { createProductSupplier } from '../../api'

const RegisterProductSupplierPage = () => {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const initialValues: RegisterProductSupplierFormValues = {
		name: '',
		email: '',
		mobileNumber: '',
		address: '',
	}

	const onSubmit = async (
		values: RegisterProductSupplierFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductSupplierFormValues>
	) => {
		setSubmitting(true)
		try {
			await createProductSupplier(values)
			setSuccessMessage('Cadastro realizado com sucesso.')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}

	return (
		<section>
			<PageHeader className="site-page-header" onBack={() => navigate('/')} title="Cadastro de fornecedor" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			<RegisterProductSupplierForm initialValues={initialValues} onSubmit={onSubmit} />
		</section>
	)
}

export default RegisterProductSupplierPage
