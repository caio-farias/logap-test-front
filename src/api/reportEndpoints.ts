import api from './api'

export const getAllOutOfStockProductCategories = async (offset = 1, pageSize = 10) =>
	await api.get('/report/product-category', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})

export const getAllOutOfStockProducts = async (offset = 1, pageSize = 10) =>
	await api.get('/report/product', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})

export const getAllProductSuppliersWithProductOutOfStock = async (offset = 1, pageSize = 10) =>
	await api.get('/report/product-supplier', {
		params: {
			offset: offset - 1,
			pageSize,
		},
	})
