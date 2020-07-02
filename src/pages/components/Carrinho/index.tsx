import React from 'react';

export default function App() {
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
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr style={{height: 100}}></tr>
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