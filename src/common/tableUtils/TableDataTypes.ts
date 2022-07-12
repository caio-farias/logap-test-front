export interface ProductAsTableData {
	id: number
	name: string
	description?: string
	productCategory: {
		id: number
		name: string
	}
	quantity: number
}

export interface ProductCategoryAsTableData {
	id: number
	name: string
}

export interface ProductSupplierAsTableData {
	id: number
	name: string
	email: string
	mobileNumber?: string
	address?: string
	products: ProductAsTableData[]
}

export interface ProductCategoryReportAsTableData {
	id: number
	name: string
	totalProducts: number
	totalInStock: number
}
