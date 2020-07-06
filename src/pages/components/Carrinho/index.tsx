import React, { useEffect, useState } from 'react';
import api from '../../../service/api';

type CardProps = {
  getId: number,
  handleCarrinho(id: number): void
  setId(id: number): void
}
interface Pokemons {
  id: number;
  name: string;
  sprites: string;
  price: number;
}
export default function App({ getId, handleCarrinho, setId }: CardProps) {
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemons[]>([]);

  useEffect(() => {

    if (getId > 0) {
      api.get(`pokemon/${getId}`).then(resp => {
        setId(0);
        const id: number = resp.data.id;
        const teste = selectedPokemons.findIndex(item => item.id === id);
        handleCarrinho(id);

        if (teste >= 0) {
          const filteredItems = selectedPokemons.filter(item => item.id !== id);
          setSelectedPokemons(filteredItems);
        } else {
          const price: number = resp.data.base_experience;
          setSelectedPokemons([...selectedPokemons, {
            id: resp.data.id,
            name: resp.data.name,
            sprites: resp.data.sprites.front_default,
            price: price,
          }])

        }
      })
    }
    // console.log(selectedPokemons)
  }, [getId, handleCarrinho, selectedPokemons, setId]);
  return (
    <div className="right col-lg-4 col-sm-4">
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col" colSpan={3}>
              <h1 id="titulo" >Carrinho</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedPokemons ? selectedPokemons.map(pokemon => (
            <tr key={pokemon.id}>
              <td><img src={pokemon.sprites} alt={pokemon.name} /></td>
              <td>{pokemon.name}</td>
              <td>{`R$${pokemon.price}`}</td>
            </tr>
          )) : ''}
          <tr>
            <td colSpan={2}>Total</td>
            <td>R$000</td>
          </tr>
          <tr>
            <td colSpan={3}>
              <button type="button" className="btn btn-secondary w-100">Secondary</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}