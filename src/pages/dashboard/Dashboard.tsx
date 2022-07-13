import React, { useEffect, useState } from 'react'
import { PageHeader, RadioChangeEvent, Table, TablePaginationConfig } from 'antd'
import { TableViewPicker } from '../../components'
import {
	productCategoryTableColumns,
	productSupplierTableColumns,
	productTableColumns,
} from '../../common/tableUtils/TableColumns'
import {
	ProductAsTableData,
	ProductCategoryAsTableData,
	ProductSupplierAsTableData,
} from '../../common/tableUtils/TableDataTypes'
import { getAllProductCategories, getAllProducts, getAllProductSuppliers } from '../../api'
import './index.scss'

export const Dashboard = () => {
	const [loading, setLoading] = useState(false)
	const [tableContent, setTableContent] = useState('product')
	const [productTableData, setProductTableData] = useState<ProductAsTableData[]>([])
	const [productCategoryTableData, setProductCategoryTableData] = useState<ProductCategoryAsTableData[]>([])
	const [productSupplierTableData, setProductSupplierTableData] = useState<ProductSupplierAsTableData[]>([])
	const initPagination = {
		current: 1,
		pageSize: 5,
	}
	const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination)

	const setUpProductTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProducts(newPagination.current, newPagination.pageSize)
		setProductTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const setUpProductCategoryTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProductCategories(newPagination.current, newPagination.pageSize)
		setProductCategoryTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const setUpProductSupplierTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProductSuppliers(newPagination.current, newPagination.pageSize)
		setProductSupplierTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setPagination({ ...newPagination, total })
	}

	const handleProductTableChange = (newPagination: TablePaginationConfig) => setUpProductTable(newPagination)

	const handleProductCategoryTableChange = (newPagination: TablePaginationConfig) =>
		setUpProductCategoryTable(newPagination)

	const handleProductSupplierTableChange = (newPagination: TablePaginationConfig) =>
		setUpProductSupplierTable(newPagination)

	useEffect(() => {
		setLoading(true)
		if (tableContent == 'product') setUpProductTable({ current: pagination.current, pageSize: pagination.pageSize })
		if (tableContent == 'product-category')
			setUpProductCategoryTable({ current: pagination.current, pageSize: pagination.pageSize })
		if (tableContent == 'product-supplier')
			setUpProductSupplierTable({ current: pagination.current, pageSize: pagination.pageSize })
		setLoading(false)
	}, [tableContent])

	const selectTableContent = (event: RadioChangeEvent) => {
		event.preventDefault()
		if (event.target.value != tableContent) {
			setPagination(initPagination)
			setTableContent(event.target.value)
		}
	}

	const options = [
		{
			value: 'product',
			text: 'Ver produtos ',
		},
		{
			value: 'product-category',
			text: 'Ver categorias ',
		},

		{
			value: 'product-supplier',
			text: 'Ver fornecedores',
		},
	]

	return (
		<section>
			<PageHeader className="page-header" title="Dashboard" />
			<TableViewPicker defaultValue={options[0]} options={options} onChange={selectTableContent} />
			{tableContent == 'product' && (
				<Table
					rowKey={(record) => record.id}
					loading={loading}
					pagination={pagination}
					columns={productTableColumns}
					dataSource={productTableData}
					onChange={handleProductTableChange}
				/>
			)}
			{tableContent == 'product-category' && (
				<Table
					rowKey={(record) => record.id}
					loading={loading}
					pagination={pagination}
					columns={productCategoryTableColumns}
					dataSource={productCategoryTableData}
					onChange={handleProductCategoryTableChange}
				/>
			)}
			{tableContent == 'product-supplier' && (
				<Table
					rowKey={(record) => record.id}
					loading={loading}
					pagination={pagination}
					columns={productSupplierTableColumns}
					dataSource={productSupplierTableData}
					onChange={handleProductSupplierTableChange}
				/>
			)}
		</section>
	)
}

export default Dashboard
