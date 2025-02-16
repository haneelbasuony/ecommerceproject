import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import img from '../../assets/images/light-patten.svg';
export default function Layout() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="flex flex-col justify-between h-screen"
      >
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}
