import React, { useState } from 'react'
import { PageHeader } from 'antd'
import { FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { FeedbackText, RegisterProductCategoryForm } from '../../components'
import { RegisterProductCategoryFormValues } from '../../components/RegisterProductCategoryForm'
import { createProductCategory } from '../../api'

const RegisterProductCategoryPage = () => {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')

	const onSubmit = async (
		values: RegisterProductCategoryFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductCategoryFormValues>
	) => {
		setSubmitting(true)
		try {
			await createProductCategory(values)
			setSuccessMessage('Cadastro realizado com sucesso.')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}

	const initialValues = {
		name: '',
	}

	return (
		<section>
			<PageHeader className="site-page-header" onBack={() => navigate('/')} title="Cadastro de categoria" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			<RegisterProductCategoryForm initialValues={initialValues} onSubmit={onSubmit} />
		</section>
	)
}

export default RegisterProductCategoryPage
