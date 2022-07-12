import { PageHeader, Table, TablePaginationConfig } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProductSupplierById } from '../../api'
import ProductSupplier from '../../common/models/ProductSupplier'
import { ProductAsTableData } from '../../common/tableUtils'

const SupplierDashboardPage = () => {
	const navigator = useNavigate()
	const location = useLocation()
	const productSupplier = location.state as ProductSupplier
	const [loading, setLoading] = useState(false)
	const [productTableData, setProductTableData] = useState<ProductAsTableData[]>([])
	const initPagination = {
		current: 1,
		pageSize: 20,
	}
	const [pagination, setPagination] = useState<TablePaginationConfig>(initPagination)

	useEffect(() => {
		setLoading(true)
		setUpProductTable({ current: pagination.current, pageSize: pagination.pageSize })
		setLoading(false)
	}, [])

	const setUpProductTable = async (newPagination: TablePaginationConfig) => {
		const res = await getProductSupplierById(productSupplier.id)
		setProductTableData(res.data.products)
		const total = res.data.products.length
		setPagination({ ...newPagination, total })
	}
	const handleProductTableChange = (newPagination: TablePaginationConfig) => {
		setLoading(true)
		setUpProductTable(newPagination)
		setLoading(false)
	}

	return (
		<div>
			<PageHeader className="site-page-header" onBack={() => navigator('/')} title="Produtos" />
			<Table
				rowKey={(record) => record.id}
				loading={loading}
				pagination={pagination}
				columns={[
					{
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
						render: (text) => <span>{text}</span>,
					},
					{
						title: 'Descrição',
						dataIndex: 'description',
						key: 'description',
					},
					{
						title: 'Categoria',
						dataIndex: 'productCatagory',
						key: 'category',
						render: (_, record) => <span>{record.productCategory.name}</span>,
					},
					{
						title: 'Preço',
						dataIndex: 'price',
						key: 'price',
					},
					{
						title: 'Quantidade',
						dataIndex: 'quantity',
						key: 'quantity',
					},
				]}
				dataSource={productTableData}
				onChange={handleProductTableChange}
			/>
		</div>
	)
}

export default SupplierDashboardPage
