import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

const Products = () => {
  return (
    <Layout>
        <Link className='bg-blue-900 text-white py-1 px-2 rounded-md'href={'/products/new'}>
            Add New Product
        </Link>
    </Layout>
  )
}

export default Products