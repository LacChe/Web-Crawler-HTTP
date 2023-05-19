import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

const DeleteProductPage = () => {
    const [productInfo, setProductInfo] = useState(null)

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if(!id) return;

        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data);
        })
    }, [id])
    
    function goBack() {
        router.push('/products');
    }

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        router.push('/products')
    }

    return (
        <Layout>
            <h1 className='text-center'>Do you really want to delete "{productInfo?.title}"?</h1>
            <div className='flex gap-2 justify-center'>
                <button className='btn-red' onClick={deleteProduct}>YES</button>
                <button className='btn-default' onClick={goBack}>NO</button>
            </div>
        </Layout>
    )
}

export default DeleteProductPage