import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const ProductForm = ({ _id, title:existingTitle, description:existingDescription, price:existingPrice }) => {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice===undefined ? '' : existingPrice);
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();
        const data ={title, description, price};
        if(_id){
            //update
            await axios.put('/api/products', {...data, _id});
        } else {
            //create
            await axios.post('/api/products', data);
        }
        setGoToProducts(true);
    }

    if(goToProducts){
        router.push('/products');
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product Name</label>
            <input type='text' placeholder='product name' onChange={e => setTitle(e.target.value)} value={title}/>
            <label>Description</label>
            <textarea placeholder='description'onChange={e => setDescription(e.target.value)} value={description}/>
            <label>Price (USD)</label>
            <input type='number' placeholder='price'onChange={e => setPrice(e.target.value)} value={price}/>
            <button type='submit' className='btn-primary'>Save</button>
        </form>
    )
}

export default ProductForm