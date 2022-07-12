import Product from './Product'

export default interface ProductSupplier {
	id: number
	name: string
	email: string
	mobileNumber?: string
	address?: string
	products?: Product[]
}
