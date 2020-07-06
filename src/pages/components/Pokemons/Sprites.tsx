import React, { useEffect, useState } from 'react';
import api from '../../../service/api';

export default function App(props: any){
  const [sprite, setSprite] = useState<string>('');
  useEffect(() => {
    api.get(props.url as string).then(response => {
      const imageURL = response.data.sprites.front_default as string;
      setSprite(imageURL)
    })
  }, [props])

  return (
      <img src={sprite} alt="pokemon" className="card-img-top" />
  );
}