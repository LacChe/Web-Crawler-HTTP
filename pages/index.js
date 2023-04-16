import React from 'react'
import { Product, HeroBanner, FooterBanner } from "../components"

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers</p>
      </div>
      <div className="products-container">
        {['p1','p2'].map(
          (item) => <Product product={item} />)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home