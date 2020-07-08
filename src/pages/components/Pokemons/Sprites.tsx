import React, { useEffect, useState } from 'react';
import api from '../../../service/api';

export default function App(props: any) {
  const [sprite, setSprite] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    api.get(props.url as string).then(response => {
      const imageURL = response.data.sprites.front_default as string;
      const { base_experience } = response.data;
      setSprite(imageURL)
      setPrice(base_experience);
    })
  }, [props])

  return (
    <>
      {sprite !== null ?
        <>
          <img src={sprite} alt="Pokemon" className="card-img-top" />
          <br />
        </>
        : ''}
      <i>{`R$${price}`}</i>
    </>
  );
}