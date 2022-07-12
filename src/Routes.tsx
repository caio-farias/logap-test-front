import React from 'react'
import { BrowserRouter as Router, Routes as Swtich, Route, Outlet } from 'react-router-dom'
import { NavBar } from './components'
import { DashboardPage } from './pages/dashboard'
import { RegisterProductPage } from './pages/registerProduct'
import { RegisterProductCategoryPage } from './pages/registerProductCategory'
import { RegisterProductSupplierPage } from './pages/registerProductSupplier'
import { UpdateProductPage } from './pages/updateProduct'
import { UpdateProductCategoryPage } from './pages/updateProductCategory'
import { UpdateProductSupplierPage } from './pages/updateProductSupplier'
import { ReportsPage } from './pages/reports'
import './styleConfig/global.scss'
import ManageSupplierProducts from './pages/manageSupplierProducts/manageSupplierProducts'
import { SupplierDashboardPage } from './pages/supplierDashboard'

export const Routes = () => {
	const ComponentLayout = () => (
		<div>
			<NavBar />
			<div className="outlet-layout">
				<Outlet />
			</div>
		</div>
	)

	return (
		<>
			<Router>
				<Swtich>
					<Route path="/" element={<ComponentLayout />}>
						<Route index element={<DashboardPage />} />
						<Route path="/relatorios" element={<ReportsPage />} />
						<Route path="/registrar-produto" element={<RegisterProductPage />} />
						<Route path="/registrar-categoria" element={<RegisterProductCategoryPage />} />
						<Route path="/registrar-fornecedor" element={<RegisterProductSupplierPage />} />
						<Route path="/editar-produto" element={<UpdateProductPage />} />
						<Route path="/editar-categoria" element={<UpdateProductCategoryPage />} />
						<Route path="/editar-fornecedor" element={<UpdateProductSupplierPage />} />
						<Route path="/gerenciar-produtos-fornecedor" element={<ManageSupplierProducts />} />
						<Route path="/ver-produtos-fornecedor" element={<SupplierDashboardPage />} />
					</Route>
				</Swtich>
			</Router>
		</>
	)
}
