import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageHeader } from 'antd'
import { FormikHelpers } from 'formik'
import * as yup from 'yup'
import { FeedbackText, RegisterProductForm } from '../../components'
import { RegisterProductFormValues } from '../../components/RegisterProductForm'
import ProductCategory from '../../common/models/ProductCategory'
import { getAllProductCategories, getAllProductSuppliers, getProductById, updateProduct } from '../../api'
import Product from '../../common/models/Product'
import ProductSupplier from '../../common/models/ProductSupplier'
import './index.scss'

const UpdateProductPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [productCategories, setProductCategories] = useState<ProductCategory[]>([])
	const [productSuppliers, setProductSuppliers] = useState<ProductSupplier[]>([])
	const [initialValues, setInitialValues] = useState<RegisterProductFormValues>({} as RegisterProductFormValues)

	const getProduct = async () => {
		const { id } = location.state as RegisterProductFormValues
		if (id) {
			const res = await getProductById(id)
			const updated = res.data
			setInitialValues({ initialValues, ...updated })
		}
	}

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
		getProduct()
	}, [])

	const product = location.state as Product
	initialValues.productCategoryId = product.productCategory.id.toString()

	const onSubmit = async (
		values: RegisterProductFormValues,
		{ setSubmitting }: FormikHelpers<RegisterProductFormValues>
	) => {
		setSubmitting(true)
		if (!initialValues.id) {
			setErrorMessage('Invalid id')
			return
		}
		try {
			await updateProduct(initialValues.id, values)
			setSuccessMessage('Atualiza????o salva.')
			setTimeout(() => {
				setSuccessMessage('')
			}, 5000)
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error.response.data.message)
		}
	}
	const validation = yup.object().shape({
		name: yup.string().required('Nome ?? um campo obrigat??rio'),
		description: yup.string().required('Descri????o ?? um campo obrigat??rio'),
		productCategoryId: yup.string().required('Categoria ?? um campo obrigat??rio'),
		quantity: yup.string().required('Quantidade ?? um campo obrigat??rio'),
	})

	return (
		<section className="product-update-page">
			<PageHeader className="page-header" onBack={() => navigate(-1)} title="Editar produtos" />
			<FeedbackText errorMessage={errorMessage} successMessage={successMessage} />
			{initialValues.id && (
				<RegisterProductForm
					initialValues={initialValues}
					actionName="Atualizar"
					validation={validation}
					isUpdate={true}
					onSubmit={onSubmit}
					productCategories={productCategories}
					productSuppliers={productSuppliers}
				/>
			)}
		</section>
	)
}

export default UpdateProductPage
