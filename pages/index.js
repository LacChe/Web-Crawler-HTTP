import React from 'react';

import { client } from '../lib/client.js';
import { Product, HeroBanner, FooterBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Beset Selling Products</h2>
        <p>Speakers</p>
      </div>
      <div className="products-container">
        {products?.map(
          (item) => <Product product={item} />)}
      </div>

      <FooterBanner />
    </>
  )
}

export const  getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }
  }
}
export default Home