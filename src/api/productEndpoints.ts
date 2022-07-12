import api from './api'

export const createProduct = async (
	productCategoryId: number | string,
	productSupplierId: number | string,
	product: any
) => await api.post(`/product/${productCategoryId}/${productSupplierId}`, { ...product })

export const updateProduct = async (id: number | string, product: any) =>
	await api.patch('/product/' + id, { ...product })

export const getProductById = async (id: number | string) => await api.get('/product/' + id)

export const getAllProducts = async (offset = 1, pageSize = 10) =>
	await api.get('/product', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})

export const getAllProductsOwnedByProductSupplierById = async (
	productSupplierId: number | string,
	offset = 1,
	pageSize = 10
) =>
	await api.get('/product/owned/' + productSupplierId, {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})

export const getAllProductsNotOwnedByProductSupplierById = async (
	productSupplierId: number | string,
	offset = 1,
	pageSize = 10
) =>
	await api.get('/product/not-owned/' + productSupplierId, {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})
