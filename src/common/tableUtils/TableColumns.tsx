import React from 'react'
import { Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import {
	ProductAsTableData,
	ProductCategoryAsTableData,
	ProductCategoryReportAsTableData,
	ProductSupplierAsTableData,
} from './TableDataTypes'
import { Link } from 'react-router-dom'

export const productTableColumns: ColumnsType<ProductAsTableData> = [
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
	{
		title: 'Ações',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link to="/editar-produto" state={record}>
					<Tag color="blue">Editar</Tag>
				</Link>
			</Space>
		),
	},
]

export const managementProductTableColumn: ColumnsType<ProductAsTableData> = [
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
	{
		title: 'Ações',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link to="/editar-produto" state={record}>
					<Tag color="blue">Editar</Tag>
				</Link>
			</Space>
		),
	},
]

export const productCategoryTableColumns: ColumnsType<ProductCategoryAsTableData> = [
	{
		title: 'Nome',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'Ações',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link to="/editar-categoria" state={record}>
					<Tag color="blue">Editar</Tag>
				</Link>
			</Space>
		),
	},
]

export const productSupplierTableColumns: ColumnsType<ProductSupplierAsTableData> = [
	{
		title: 'Nome',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'E-mail',
		dataIndex: 'email',
		key: 'email',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'Contato',
		dataIndex: 'mobileNumber',
		key: 'mobileNumber',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'Endereço',
		dataIndex: 'address',
		key: 'address',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'Ações',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
				<Link to="/editar-fornecedor" state={record}>
					<Tag color="blue">Editar</Tag>
				</Link>
				<Link to="/gerenciar-produtos-fornecedor" state={record}>
					<Tag color="gray">Gerenciar produtos</Tag>
				</Link>
			</Space>
		),
	},
]

export const productCategoryReportTableColumns: ColumnsType<ProductCategoryReportAsTableData> = [
	{
		title: 'Nome da Categoria',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <span>{text}</span>,
	},
	{
		title: 'Total em estoque',
		dataIndex: 'totalInStock',
		key: 'totalInStock',
		render: (text) => <span>{text}</span>,
	},
]
