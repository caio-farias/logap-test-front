import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Table, TablePaginationConfig } from 'antd'
import { managementProductTableColumn, ProductAsTableData } from '../../common/tableUtils'
import {
	addProductToProductSupplier,
	getAllProductsNotOwnedByProductSupplierById,
	getAllProductsOwnedByProductSupplierById,
	removeProductToProductSupplier,
} from '../../api'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductSupplier from '../../common/models/ProductSupplier'
import './index.scss'

const ManageSupplierProductsPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const productSupplier = location.state as ProductSupplier
	const [loading, setLoading] = useState(false)
	const [selectedAddProductTableRowKeys, setAddTableSelectedRowKeys] = useState<React.Key[]>([])
	const [selectedRemoveProductTableRowKeys, setRemoveTableSelectedRowKeys] = useState<React.Key[]>([])
	const [addProductTableData, setAddProductTableData] = useState<ProductAsTableData[]>([])
	const [removeProductTableData, setRemoveProductTableData] = useState<ProductAsTableData[]>([])
	const initPagination = {
		current: 1,
		pageSize: 5,
	}
	const [addProductTablePagination, setAddProductTablePagination] = useState<TablePaginationConfig>(initPagination)
	const [removeProductTablePagination, setRemoveProductTablePagination] =
		useState<TablePaginationConfig>(initPagination)

	const setUpAddProductTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProductsNotOwnedByProductSupplierById(
			productSupplier.id,
			newPagination.current,
			newPagination.pageSize
		)
		setAddProductTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setAddProductTablePagination({ ...newPagination, total })
	}

	const setUpRemoveProductTable = async (newPagination: TablePaginationConfig) => {
		const res = await getAllProductsOwnedByProductSupplierById(
			productSupplier.id,
			newPagination.current,
			newPagination.pageSize
		)
		setRemoveProductTableData(res.data.response.content)
		const total = res.data.response.totalElements
		setRemoveProductTablePagination({ ...newPagination, total })
	}

	useEffect(() => {
		setUpAddProductTable({ current: addProductTablePagination.current, pageSize: addProductTablePagination.pageSize })
		setUpRemoveProductTable({
			current: removeProductTablePagination.current,
			pageSize: removeProductTablePagination.pageSize,
		})
	}, [loading])

	const addProducts = async () => {
		setLoading(true)
		await addProductToProductSupplier(productSupplier.id, selectedAddProductTableRowKeys as number[])
		setUpAddProductTable({ current: addProductTablePagination.current, pageSize: addProductTablePagination.pageSize })
		setLoading(false)
		setAddTableSelectedRowKeys([])
	}

	const removeProducts = async () => {
		setLoading(true)
		await removeProductToProductSupplier(productSupplier.id, selectedRemoveProductTableRowKeys as number[])
		setUpRemoveProductTable({
			current: removeProductTablePagination.current,
			pageSize: removeProductTablePagination.pageSize,
		})
		setLoading(false)
		setRemoveTableSelectedRowKeys([])
	}

	const addProductTableOnSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setAddTableSelectedRowKeys(newSelectedRowKeys)
	}

	const removeProductTableOnSelectChange = async (newSelectedRowKeys: React.Key[]) => {
		setRemoveTableSelectedRowKeys(newSelectedRowKeys)
	}

	const addTableRowSelection = {
		selectedAddProductTableRowKeys,
		onChange: addProductTableOnSelectChange,
	}

	const removeTableRowSelection = {
		selectedRemoveProductTableRowKeys,
		onChange: removeProductTableOnSelectChange,
	}

	const hasSelectedAddProductTable = selectedAddProductTableRowKeys.length > 0

	const hasSelectedRemoveProductTable = selectedRemoveProductTableRowKeys.length > 0

	return (
		<section className="product-supplier-management-page">
			<PageHeader className="page-header" onBack={() => navigate('/')} title="Gerenciamento de produtos" />
			<section>
				<div style={{ marginBottom: 16 }}>
					<PageHeader className="page-header" title="Adicionar produtos" />
					<Button
						color="green"
						type="primary"
						onClick={addProducts}
						disabled={!hasSelectedAddProductTable}
						loading={loading}
					>
						Adicionar
					</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelectedAddProductTable ? `${selectedAddProductTableRowKeys.length} itens selecionados` : ''}
					</span>
				</div>
				<Table
					rowKey={(record) => record.id}
					rowSelection={addTableRowSelection}
					loading={loading}
					pagination={addProductTablePagination}
					dataSource={addProductTableData}
					columns={managementProductTableColumn}
				/>
			</section>
			<section>
				<div style={{ marginBottom: 16 }}>
					<PageHeader className="page-header" title="Remover produtos" />
					<Button
						type="primary"
						danger
						onClick={removeProducts}
						disabled={!hasSelectedRemoveProductTable}
						loading={loading}
					>
						Remover
					</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelectedRemoveProductTable ? `${selectedRemoveProductTableRowKeys.length} itens selecionados` : ''}
					</span>
				</div>
				<Table
					rowKey={(record) => record.id}
					loading={loading}
					rowSelection={removeTableRowSelection}
					pagination={removeProductTablePagination}
					dataSource={removeProductTableData}
					columns={managementProductTableColumn}
				/>
			</section>
		</section>
	)
}

export default ManageSupplierProductsPage
