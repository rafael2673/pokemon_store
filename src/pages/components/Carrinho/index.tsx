import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Modal from '../Modal';
import './style.css';
type CardProps = {
  getId: number,
  handleCarrinho(id: number): void,
  setId(id: number): void,
  reiniciar(): void
}
interface Pokemons {
  id: number;
  name: string;
  sprites: string;
  price: number;
}
export default function App({ getId, handleCarrinho, setId, reiniciar }: CardProps) {
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemons[]>([]);
  const [price, setPrice] = useState(0);
  const [contador, setContador] = useState(0);


  useEffect(() => {

    if ((selectedPokemons.length) - 1 === contador) {
      setPrice(price + selectedPokemons[selectedPokemons.length - 1].price)
      setContador(contador + 1);
    }

    if (getId > 0) {

      api.get(`pokemon/${getId}`).then(resp => {
        setId(0);
        const id: number = resp.data.id;
        const teste = selectedPokemons.findIndex(item => item.id === id);
        handleCarrinho(id);



        if (teste >= 0) {
          const filteredItems = selectedPokemons.filter(item => item.id !== id);
          setPrice(price - selectedPokemons[teste].price);
          setContador(contador - 1);
          setSelectedPokemons(filteredItems);

          localStorage.setItem('selectedPokemons', JSON.stringify(filteredItems));
          localStorage.setItem('price', String(price));
          localStorage.setItem('contador', String(contador));

        } else {
          const preco: number = resp.data.base_experience;
          setSelectedPokemons([...selectedPokemons, {
            id: resp.data.id,
            name: resp.data.name,
            sprites: resp.data.sprites.front_default,
            price: preco,
          }])
          localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons));
          localStorage.setItem('price', String(price));
          localStorage.setItem('contador', String(contador));
        }
      })

    }
  }, [getId, handleCarrinho, selectedPokemons, setId, price, contador]);

  useEffect(() => {
    if (localStorage.getItem('selectedPokemons') !== null && contador === 0) {
      const pokemons: Pokemons[] = JSON.parse(localStorage.getItem('selectedPokemons') as string);
      const price: number = Number(localStorage.getItem('price'));
      const contador: number = Number(localStorage.getItem('contador'));

      return (
        setSelectedPokemons(pokemons),
        setPrice(price),
        setContador(contador)
      )
    }
  }, [contador])

  function handleClose() {
    setSelectedPokemons([]);
    setPrice(0);
    setContador(0);
    setId(0);
    localStorage.clear();
    reiniciar();

  }

  return (
    <div className="right col-lg-4 col-sm-4">
      <div className="table-responsive-sm">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" colSpan={3}>
                <h1 id="titulo" >Carrinho</h1>
              </th>
            </tr>
          </thead>


          <tbody className="scroll">
            {selectedPokemons ? selectedPokemons.map(pokemon => (
              <tr key={pokemon.id}>
                {pokemon.sprites !== null ?
                  <>
                    <td><img src={pokemon.sprites} alt="Pokemon" className="card-img-top" /></td>
                    <td><span className="informations">{pokemon.name}</span></td>
                    <td><span className="informations">{`R$${pokemon.price}`}</span></td>
                  </>
                  :
                  <>
                    <td colSpan={2}><span>{pokemon.name}</span></td>
                    <td><span>{`R$${pokemon.price}`}</span></td>
                  </>
                }
              </tr>
            )) : ''}
          </tbody>
        </table>
        <div className="total">
          <span className="span">Total</span>
          <span>{`R$${price}`}</span>
        </div>
        <Modal selectedPokemons={selectedPokemons} close={handleClose} />
      </div>
    </div>
  );
}