import React from 'react'
import * as yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'
import { Select, TextInput } from '../../components'
import { Button, Spin } from 'antd'
import ProductCategory from '../../common/models/ProductCategory'
import ProductSupplier from '../../common/models/ProductSupplier'
import './index.scss'

export interface RegisterProductFormValues {
	id?: number
	name: string
	productCategoryId: string
	productSupplierId: string
	description?: string
	quantity: string
}

const defaultValidation = yup.object().shape({
	name: yup.string().required('Nome é um campo obrigatório'),
	description: yup.string().required('Descrição é um campo obrigatório'),
	productCategoryId: yup.string().required('Categoria é um campo obrigatório'),
	productSupplierId: yup.string().required('Fornecedor é um campo obrigatório'),
	quantity: yup.string().required('Quantidade é um campo obrigatório'),
})

export const RegisterProductForm = ({
	initialValues,
	validation = defaultValidation,
	isUpdate = false,
	actionName = 'Cadastrar',
	onSubmit,
	productCategories,
	productSuppliers,
}: {
	initialValues: RegisterProductFormValues
	validation?: any
	onSubmit: (values: RegisterProductFormValues, { setSubmitting }: FormikHelpers<RegisterProductFormValues>) => void
	productCategories: ProductCategory[]
	productSuppliers: ProductSupplier[]
	actionName?: string
	isUpdate?: boolean
}) => {
	return (
		<div className="register-product-form">
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
				{({ isSubmitting }) => (
					<Form>
						<TextInput label="Nome" name="name" error="" />
						<TextInput label="Descrição" name="description" error="" />
						<Select
							label="Categoria"
							name="productCategoryId"
							selected="Escolha uma categoria"
							options={productCategories.map((p) => p)}
						/>
						{!isUpdate && (
							<Select
								label="Fornecedor"
								name="productSupplierId"
								selected="Escolha um fornecedor"
								options={productSuppliers.map((p) => p)}
							/>
						)}
						<TextInput label="Quantidade" type="number" name="quantity" error="" />
						<Button htmlType="submit">
							{actionName}
							{isSubmitting && <Spin className="spin" />}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default RegisterProductForm
