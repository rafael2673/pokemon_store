import React from 'react';
import './style.css'

export default function App(props: any) {
  function handleClose(){
    
  }
  return (
    <>
      {props.selectedPokemons.length !== 0 ?
        <>
          <button type="button" className="btn btn-secondary w-100" data-toggle="modal" data-target="#exampleModal">
            Finalizar
          </button>

          <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="exampleModalLabel">Parabéns</h1>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h5>Compra realizada.</h5>
                  {props.selectedPokemons.map((pokemon: any) => (
                    <div key = {pokemon.id}>
                      <img src={pokemon.sprites} alt={pokemon.name} />
                      <span>{pokemon.name}</span><span className="price">{`R$${pokemon.price}`}</span>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick = {handleClose}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <button type="button" className="btn btn-secondary w-100" data-toggle="modal" data-target="#alert">
            Finalizar
        </button>
          <div className="modal fade" id="alert" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="exampleModalLabel">Erro</h1>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <span className="alert alert-danger" role="alert">Precisa adicionar algum item ao carrinho para finalizar sua compra.</span>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}