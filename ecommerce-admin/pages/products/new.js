import Layout from '@/components/Layout'
import React, { useState } from 'react'

import axios from 'axios';
import { useRouter } from 'next/router';

const NewProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();

    async function createProduct(e) {
        e.preventDefault();
        const data ={title, description, price};
        await axios.post('/api/products', data);
        setGoToProducts(true);
    }

    if(goToProducts){
        router.push('/products');
    }

    
  return (
    <Layout>
        <form onSubmit={createProduct}>
            <h1>New Product</h1>
            <label>Product Name</label>
            <input type='text' placeholder='product name' onChange={e => setTitle(e.target.value)} value={title}/>
            <label>Description</label>
            <textarea placeholder='description'onChange={e => setDescription(e.target.value)} value={description}/>
            <label>Price (USD)</label>
            <input type='number' placeholder='price'onChange={e => setPrice(e.target.value)} value={price}/>
            <button type='submit' className='btn-primary'>Save</button>
        </form>
    </Layout>
  )
}
 
export default NewProduct