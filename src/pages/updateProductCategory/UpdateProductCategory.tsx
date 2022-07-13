import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd'
import { FormikHelpers } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { FeedbackText, RegisterProductCategoryForm } from '../../components'
import { RegisterProductCategoryFormValues } from '../../components/RegisterProductCategoryForm'
import { getProductCategoryById, updateProductCategory } from '../../api'
import './index.scss'

const UpdateProductCategoryPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [initialValues, setInitialValues] = useState<RegisterProductCategoryFormValues>(
		{} as RegisterProductCategoryFormValues
	)

	const getProductCategory = async () => {
		const { id } = location.state as RegisterProductCategoryFormValues
		if (id) {
			const res = await getProductCategoryById(id)
			const updated = res.data
			setInitialValues({ initialValues, ...updated })
		}
	}

	useEffect(() => {
		getProductCategory()
	}, [])

	const onSubmit = async (
		values: RegisterProductCategoryFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductCategoryFormValues>
	) => {
		setSubmitting(true)
		if (!initialValues.id) {
			setErrorMessage('Invalid id')
			return
		}
		try {
			await updateProductCategory(initialValues.id, values)
			setSuccessMessage('Atualização salva.')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}

	return (
		<section className="product-category-update-page">
			<PageHeader className="page-header" onBack={() => navigate('/')} title="Editar categorias" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			{initialValues.id && (
				<RegisterProductCategoryForm actionName="Atualizar" initialValues={initialValues} onSubmit={onSubmit} />
			)}
		</section>
	)
}

export default UpdateProductCategoryPage
