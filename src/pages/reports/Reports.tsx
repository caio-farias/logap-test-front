import React, { useEffect, useState } from 'react'
import { RadioChangeEvent, Table, TablePaginationConfig } from 'antd'
import { TableViewPicker } from '../../components'
import {
	ProductAsTableData,
	ProductCategoryReportAsTableData,
	ProductSupplierAsTableData,
	productTableColumns,
	productSupplierTableColumns,
	productCategoryReportTableColumns,
} from '../../common/tableUtils'
import {
	getAllOutOfStockProducts,
	getAllOutOfStockProductCategories,
	getAllProductSuppliersWithProductOutOfStock,
} from '../../api'

export const ReportsPage = () => {
	const [loading, setLoading] = useState(false)
	const [tableContent, setTableContent] = useState('product-report')
	const [productTableData, setProductTableData] = useState<ProductAsTableData[]>([])
	const [productCategoryReportTableData, setProductCategoryReportTableData] = useState<
		ProductCategoryReportAsTableData[]
	>([])
	const [productSupplierTableData, setProductSupplierTableData] = useState<ProductSupplierAsTableData[]>([])
	const initPagination = {
		current: 1,
		pageSize: 10,
	}
	const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination)

	const setUpReportProductTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllOutOfStockProducts(newPagination.current, newPagination.pageSize)
		setProductTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const setUpReportProductCategoryTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllOutOfStockProductCategories(newPagination.current, newPagination.pageSize)
		setProductCategoryReportTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const setUpReportProductSupplierTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProductSuppliersWithProductOutOfStock(newPagination.current, newPagination.pageSize)
		setProductSupplierTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const handleReportProductTableChange = (newPagination: TablePaginationConfig) =>
		setUpReportProductTable(newPagination)

	const handleReportProductCategoryTableChange = (newPagination: TablePaginationConfig) =>
		setUpReportProductCategoryTable(newPagination)

	const handleReportProductSupplierTableChange = (newPagination: TablePaginationConfig) =>
		setUpReportProductSupplierTable(newPagination)

	useEffect(() => {
		setLoading(true)
		if (tableContent == 'product-report') setUpReportProductTable(pagination)
		if (tableContent == 'product-category-report') setUpReportProductCategoryTable(pagination)
		if (tableContent == 'product-supplier-report') setUpReportProductSupplierTable(pagination)
		setLoading(false)
	}, [tableContent])

	const options = [
		{
			value: 'product-report',
			text: 'Ver produtos em falta',
		},
		{
			value: 'product-category-report',
			text: 'Ver relatório de categorias',
		},
		{
			value: 'product-supplier-report',
			text: 'Ver fornecedores com produtos em falta',
		},
	]

	const selectTableContent = (event: RadioChangeEvent) => {
		event.preventDefault()
		if (event.target.value != tableContent) {
			setPagination(initPagination)
			setTableContent(event.target.value)
		}
	}

	return (
		<section>
			<TableViewPicker defaultValue={options[0]} options={options} onChange={selectTableContent} />
			{tableContent == 'product-report' && (
				<Table
					rowKey="id"
					pagination={pagination}
					loading={loading}
					columns={productTableColumns}
					dataSource={productTableData}
					onChange={handleReportProductTableChange}
				/>
			)}
			{tableContent == 'product-category-report' && (
				<Table
					rowKey="id"
					pagination={pagination}
					loading={loading}
					columns={productCategoryReportTableColumns}
					dataSource={productCategoryReportTableData}
					onChange={handleReportProductCategoryTableChange}
				/>
			)}
			{tableContent == 'product-supplier-report' && (
				<Table
					rowKey="id"
					pagination={pagination}
					loading={loading}
					columns={productSupplierTableColumns}
					dataSource={productSupplierTableData}
					onChange={handleReportProductSupplierTableChange}
				/>
			)}
		</section>
	)
}

export default ReportsPage
