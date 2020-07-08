import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Sprites from './Sprites';
import Carrinho from '../Carrinho';
import Pagination from '../Pagination';

import './style.css';

interface Pokemons {
  name: string,
  url: string
}
interface Pokemon {
  id: number,
  name: string,
  url: string,
  price: number,
}

type Props = {
  busca: string
}

export default function App({ busca }: Props) {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>({ id: 0, name: '', url: '', price: 0 });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [ids, setIds] = useState(0);
  const [url, setURL] = useState('');
  const [urlPrev, setUrlPrev] = useState('');
  useEffect(() => {

    if (busca === null || busca === '') {
      const pokemon: Pokemon = { id: 0, name: '', url: '', price: 0 }
      setPokemon(pokemon);
      api.get('pokemon/?limit=21').then(resp => {
        setPokemons(resp.data.results);
        setURL(resp.data.next);
        setUrlPrev(resp.data.previous);
      }
      );
    } else {

      api.get(`pokemon/${busca}`).then(resp => {
        const { id, name } = resp.data;
        const sprite = resp.data.sprites.front_default;
        const { base_experience } = resp.data;
        const pokemon: Pokemon = { id: id, name: name, url: sprite, price: base_experience }
        setPokemon(pokemon);
      }
      );
    }
  }, [busca]);


  function setId(id: number) {
    setIds(id);
  }
  function getId() {
    return ids;
  }

  function getUrl() {
    return url.slice(26, 60);
  }
  function getUrlPrev() {
    if (urlPrev !== null) {
      return urlPrev.slice(26, 60);
    } else {
      return null;
    }
  }
  // function setTotal(){
  //   if (selectedItems.length > 0) {
  //     for (let i = 0; i < selectedPokemons.length; i++) {
  //       setPrice(price + selectedPokemons[i].price);
  //     }
  //   }
  // }
  function handleCarrinho(id: number) {
    const alreadSelected = selectedItems.findIndex(item => item === id);
    if (alreadSelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }
  function handleOver() {
    console.log("passou por cima")
  }
  function handleNext() {
    api.get(getUrl()).then(resp => {
      setPokemons(resp.data.results);
      setURL(resp.data.next);
      setUrlPrev(resp.data.previous);
    }
    );
  }
  function handlePrev() {
    const url: string = getUrlPrev() as string;
    if (url !== null) {
      api.get(url).then(resp => {
        setPokemons(resp.data.results);
        setURL(resp.data.next);
        setUrlPrev(resp.data.previous);
      }
      );
    }
  }

  return (
    <>
      <div className="row">
        <div className="left col-lg-6 col-sm-6" onMouseOver={handleOver}>
          <div className="row row-cols-1 row-cols-md-3">
            {pokemons !== undefined && pokemon.id === 0 ? pokemons.map(result => (
              <div key={result.url.split('/')[6]}
                className="col mb-4">
                <div onClick={() => setId(Number(result.url.split('/')[6]))}
                  className={`card text-center 
                  ${selectedItems.includes(Number(result.url.split('/')[6])) ? 'selected' : ''}`}>
                  <div className="card-header">
                    {result.url.split('/')[6]}
                  </div>
                  <div className="card-body">
                    <Sprites url={result.url as string} />
                    <p className="card-text">{result.name}</p>
                  </div>
                </div>
              </div>
            ))
              :
              <div className="col mb-4">
                <div onClick={() => setId(pokemon.id)}
                  className={`card text-center 
                  ${selectedItems.includes(pokemon.id) ? 'selected' : ''}`}>
                  <div className="card-header">
                    {pokemon.id}
                  </div>
                  <div className="card-body">
                    <img src={pokemon.url} alt="pokemon" className="card-img-top" />
                    <i>{`R$${pokemon.price}`}</i>
                    <p className="card-text">{pokemon.name}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="center col-lg-1 col-sm-1"></div>

        <Carrinho handleCarrinho={handleCarrinho} getId={getId()} setId={setId} 
        />
      </div>
      <Pagination handleNext={handleNext}
        getUrlPrev={getUrlPrev} handlePrev={handlePrev}
      />
    </>
  );
}