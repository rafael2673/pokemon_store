import React, { FormEvent, useState, ChangeEvent } from 'react';
import lupa from '../../../assets/search.svg';
import './style.css';
import Pokemons from '../Pokemons';

export default function App() {
	const [pesquisa, setPesquisa] = useState({ busca: '' });
	const [busca, setBusca] = useState('');
	
	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const valor = e.target.value;
		setPesquisa({ ...pesquisa, busca: valor });
	}
	
	function getBusca() {
		return busca;
	}
	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const { busca } = pesquisa;

		setBusca(busca);

	}
	return (
		<div className='container-fluid'>
			<div className="nav">
				<form className="form" onSubmit={handleSubmit}>
					<label><img src={lupa} alt="lupa" className="icon" /></label>
					<input type="text" className="pesquisar"
						name="pesquisar" placeholder="pesquisar"
						onChange={handleInputChange} />
				</form>
			</div>

			<Pokemons busca = {getBusca()} />
		</div>
	);
}