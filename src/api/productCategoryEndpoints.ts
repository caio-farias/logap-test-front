import api from './api'

export const createProductCategory = async (productCategory: any) =>
	await api.post('/product-category', { ...productCategory })

export const updateProductCategory = async (id: number | string, productCategory: any) =>
	await api.patch('/product-category/' + id, { ...productCategory })

export const getProductCategoryById = async (id: number | string) => await api.get('/product-category/' + id)

export const getAllProductCategories = async (offset = 1, pageSize = 10) =>
	await api.get('/product-category', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})
