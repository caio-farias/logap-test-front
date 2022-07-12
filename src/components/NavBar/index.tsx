import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

export const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-wrapper">
				<NavLink className="navbar-wrapper-link" to="/">
					Dashboard
				</NavLink>
				<NavLink className="navbar-wrapper-link" to="/relatorios">
					Relatórios
				</NavLink>
				<NavLink className="navbar-wrapper-link" to="/registrar-produto">
					Cadastrar produto
				</NavLink>
				<NavLink className="navbar-wrapper-link" to="/registrar-categoria">
					Cadastrar categoria
				</NavLink>
				<NavLink className="navbar-wrapper-link" to="/registrar-fornecedor">
					Cadastrar fornecedor
				</NavLink>
			</div>
		</nav>
	)
}

export default NavBar
