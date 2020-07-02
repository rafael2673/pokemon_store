import React from 'react';
import Menu from '../components/Menu';
import Pokemons from '../components/Pokemons';
import Carrinho from '../components/Carrinho';

import './style.css'

export default function App() {
  return (
    <div className = 'container-fluid'>
      <Menu />
      <div className="row">
        <Pokemons />
        <Carrinho />
      </div>
    </div>
  );
}