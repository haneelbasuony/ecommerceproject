import React from 'react';
import erroimg from '../../assets/images/error.svg';

export default function Notfound() {
  return (
    <div className="container flex justify-center align-middle mt-11">
      <img src={erroimg} className="w-4/6" alt="" />
    </div>
  );
}
