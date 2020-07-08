import React, { useState, useEffect } from 'react';
import './style.css';


type Props = {
  handleNext(): void;
  handlePrev(): void;
  getUrlPrev(): string | null;
  count: number;
  handleNumber(url: string): void;
}
export default function App({ handleNext, handlePrev, getUrlPrev, count, handleNumber }: Props) {
  const [iterator, setIterator] = useState<number[]>([]);
  useEffect(() => {

    if (iterator.length === 0) {
      let teste: number[] = [0]
      for (let i = 1; i * 21 <= count; i++) {
        let resultado = (i * 21);
        console.log(resultado)
        teste.push(resultado)
        setIterator(teste);
      }
    }
  }, [count, iterator]);

  function handleUrl(qtd: number) {
    const url = `/?offset=${qtd}&limit=21`
    return url;
  }
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${getUrlPrev() === null ? 'disabled' : ''}`} onClick={handlePrev}>
            <span className="page-link">Previous</span>
          </li>
          {iterator.map((item, index) => (
            <li className="page-item" key={index} onClick={() => handleNumber(handleUrl(item))}>
              <span className="page-link">{index + 1}</span>
            </li>
          ))}
          <li className="page-item" onClick={handleNext}>
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </>
  );
}