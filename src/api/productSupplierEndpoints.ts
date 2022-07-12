import api from './api'

export const createProductSupplier = async (productSupplier: any) =>
	await api.post('/product-supplier', { ...productSupplier })

export const updateProductSupplier = async (id: number | string, productSupplier: any) =>
	await api.patch('/product-supplier/' + id, { ...productSupplier })

export const addProductToProductSupplier = async (id: number | string, productIds: number[]) =>
	await api.patch('/product-supplier/add/' + id, { productIds })

export const removeProductToProductSupplier = async (id: number | string, productIds: number[]) =>
	await api.patch('/product-supplier/remove/' + id, { productIds })

export const getAllProductSuppliers = async (offset = 1, pageSize = 10) =>
	await api.get('/product-supplier', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})

export const getProductSupplierById = async (id: number | string) => await api.get('/product-supplier/' + id)
