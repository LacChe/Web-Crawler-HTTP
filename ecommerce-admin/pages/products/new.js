import Layout from '@/components/Layout'
import React from 'react'

const NewProduct = () => {
  return (
    <Layout>
        <h1>New Product</h1>
        <label>Product Name</label>
        <input type='text' placeholder='product name'/>
        <label>Description</label>
        <textarea placeholder='description'/>
        <label>Price (USD)</label>
        <input type='number' placeholder='price'/>
    </Layout>
  )
}

export default NewProduct