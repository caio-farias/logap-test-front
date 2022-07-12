export default interface Product {
	id: number
	name: string
	description?: string
	productCategory: {
		id: number
		name: string
	}
	price: number
	quantity: number
}
