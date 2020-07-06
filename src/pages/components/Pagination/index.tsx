import React from 'react';


type Props = {
  handleNext(): void;
  handlePrev(): void;
  getUrlPrev(): string | null;
  
}
export default function App({ handleNext, handlePrev, getUrlPrev }: Props) {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${getUrlPrev() === null ? 'disabled' : ''}`} onClick={handlePrev}>
            <span className="page-link">Previous</span>
          </li>
          <li className="page-item" onClick={handleNext}>
            <span className="page-link">Next</span>
          </li>
        </ul>
      </nav>
    </>
  );
}