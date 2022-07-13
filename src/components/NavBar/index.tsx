import React from 'react'
import { BarChartOutlined, PlusCircleOutlined, ProfileOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import './index.scss'

export const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-wrapper">
				<div className="navbar-wrapper-main">
					<NavLink className="navbar-wrapper-link" to="/">
						<BarChartOutlined />
						<span className="navbar-wrapper-link-text">Dashboard</span>
					</NavLink>
					<NavLink className="navbar-wrapper-link" to="/relatorios">
						<ProfileOutlined />
						<span className="navbar-wrapper-link-text">Relatórios</span>
					</NavLink>
				</div>
				<div className="navbar-wrapper-secondary">
					<NavLink className="navbar-wrapper-link" to="/registrar-produto">
						<PlusCircleOutlined />
						<span className="navbar-wrapper-link-text">Cadastrar produto</span>
					</NavLink>
					<NavLink className="navbar-wrapper-link" to="/registrar-categoria">
						<PlusCircleOutlined />
						<span className="navbar-wrapper-link-text">Cadastrar categoria</span>
					</NavLink>
					<NavLink className="navbar-wrapper-link" to="/registrar-fornecedor">
						<PlusCircleOutlined />
						<span className="navbar-wrapper-link-text">Cadastrar fornecedor</span>
					</NavLink>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
