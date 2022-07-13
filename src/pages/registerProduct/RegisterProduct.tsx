import React, { useState, useEffect } from 'react'
import { PageHeader } from 'antd'
import { FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import { FeedbackText, RegisterProductForm } from '../../components'
import { RegisterProductFormValues } from '../../components/RegisterProductForm'
import ProductCategory from '../../common/models/ProductCategory'
import { createProduct, getAllProductCategories, getAllProductSuppliers } from '../../api'
import ProductSupplier from '../../common/models/ProductSupplier'
import './index.scss'

const RegisterProductPage = () => {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [productCategories, setProductCategories] = useState<ProductCategory[]>([])
	const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>([])

	const getCategorias = async () => {
		const res = await getAllProductCategories(1, 100)
		setProductCategories(res.data.response.content)
	}

	const getSuppliers = async () => {
		const res = await getAllProductSuppliers(1, 100)
		setProductSuppliers(res.data.response.content)
	}

	useEffect(() => {
		getCategorias()
		getSuppliers()
	}, [])

	const initialValues: RegisterProductFormValues = {
		name: '',
		description: '',
		productCategoryId: '',
		productSupplierId: '',
		quantity: '',
	}

	const onSubmit = async (
		values: RegisterProductFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductFormValues>
	) => {
		setSubmitting(true)
		try {
			await createProduct(values.productCategoryId, values.productSupplierId, values)
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
		<section className="product-register-page">
			<PageHeader className="page-header" onBack={() => navigate('/')} title="Cadastro de produto" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			<RegisterProductForm
				initialValues={initialValues}
				onSubmit={onSubmit}
				productCategories={productCategories}
				productSuppliers={productSuppliers}
			/>
		</section>
	)
}

export default RegisterProductPage
