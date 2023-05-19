import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState(null)

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if(!id) return;

        axios.get('/api/products?id='+id).then(res => {
            setProductInfo(res.data);
        })
    }, [id])
    

    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <ProductForm {...productInfo}/>
            )}
        </Layout>
    )
}

export default EditProductPage