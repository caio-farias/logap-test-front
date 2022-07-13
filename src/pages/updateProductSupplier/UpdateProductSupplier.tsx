import React, { useEffect, useState } from 'react'
import { PageHeader } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { FeedbackText, RegisterProductSupplierForm } from '../../components'
import { RegisterProductSupplierFormValues } from '../../components/RegisterProductSupplierForm'
import { FormikHelpers } from 'formik'
import { getProductSupplierById, updateProductSupplier } from '../../api'
import './index.scss'

const UpdateProductSupplierPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [initialValues, setInitialValues] = useState<RegisterProductSupplierFormValues>(
		{} as RegisterProductSupplierFormValues
	)

	const getProductSupplier = async () => {
		const { id } = location.state as RegisterProductSupplierFormValues
		if (id) {
			const res = await getProductSupplierById(id)
			const updated = res.data
			setInitialValues({ initialValues, ...updated })
		}
	}

	useEffect(() => {
		getProductSupplier()
	}, [])

	const onSubmit = async (
		values: RegisterProductSupplierFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductSupplierFormValues>
	) => {
		setSubmitting(true)
		if (!initialValues.id) {
			setErrorMessage('Invalid id')
			return
		}
		try {
			const res = await updateProductSupplier(initialValues.id, values)
			setInitialValues(res.data)
			setSuccessMessage('Atualização salva.')
			setErrorMessage('')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
		} catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}

	return (
		<section className="product-supplier-update-page">
			<PageHeader className="page-header" onBack={() => navigate('/')} title="Editar fornecedor" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			{initialValues.id && (
				<RegisterProductSupplierForm actionName="Atualizar" initialValues={initialValues} onSubmit={onSubmit} />
			)}
		</section>
	)
}

export default UpdateProductSupplierPage
