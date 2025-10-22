
import React from 'react'
import Header from '../../components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductsGrid from './ProductsGrid';
import './HomePage.css';

function HomePage({cart}) {

  const [products, setProducts] = useState([]);



  useEffect(() => {
    axios.get('/api/products')
    .then((response)=>{
      setProducts(response.data);
    });


  }, []);



  return (
    <>
    <Header
      cart={cart}
    />
    <div className="home-page">
     <ProductsGrid products={products} />
    </div>

    </>
  )
}

export default HomePage
