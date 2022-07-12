import {
	createProductCategory,
	getProductCategoryById,
	getAllProductCategories,
	updateProductCategory,
} from './productCategoryEndpoints'
import {
	createProduct,
	getAllProducts,
	getProductById,
	getAllProductsNotOwnedByProductSupplierById,
	getAllProductsOwnedByProductSupplierById,
	updateProduct,
} from './productEndpoints'
import {
	createProductSupplier,
	getProductSupplierById,
	getAllProductSuppliers,
	updateProductSupplier,
	addProductToProductSupplier,
	removeProductToProductSupplier,
} from './productSupplierEndpoints'
import {
	getAllOutOfStockProducts,
	getAllOutOfStockProductCategories,
	getAllProductSuppliersWithProductOutOfStock,
} from './reportEndpoints'

export {
	createProduct,
	createProductCategory,
	createProductSupplier,
	getProductById,
	getProductCategoryById,
	getProductSupplierById,
	getAllProductsOwnedByProductSupplierById,
	getAllProductsNotOwnedByProductSupplierById,
	getAllProducts,
	getAllProductCategories,
	getAllProductSuppliers,
	getAllOutOfStockProducts,
	getAllOutOfStockProductCategories,
	getAllProductSuppliersWithProductOutOfStock,
	updateProduct,
	updateProductCategory,
	updateProductSupplier,
	addProductToProductSupplier,
	removeProductToProductSupplier,
}
