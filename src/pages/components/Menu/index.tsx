import React from 'react';
import lupa from '../../../assets/search.svg';
import './style.css';

export default function App() {
  return (
    <div className="nav">
			<form className = "form">
				<label><img src={lupa} alt = "lupa" className = "icon" /></label>
				<input type="text" className = "pesquisar" name="pesquisar" placeholder="pesquisar" />
			</form>
		</div>
  );
}