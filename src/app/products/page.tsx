"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Products() {
    type Product = {
        id: number;
        name: string;
        description: string;
    };
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getProducts() {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8080/products');
            const result = await res.json();
            const productsArray = Object.keys(result).map(key => ({
                productId: parseInt(key),
                ...result[key]
            }));
            console.log(productsArray)
            setProducts(productsArray);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        // Log products when it changes
        console.log(products);
    }, [products]); // Run this effect whenever products change

    return (
        <div className='min-h-screen max-h-full flex items-center flex-col'>
            {loading ? (
                "loading"
            ) : products && products.length > 0 ? (
                products.map((product, idx) => (
                    <div key={product.id} className='mt-3 bg-gray-950 p-3 rounded-xl'>
                        <Link href={`/products/${product.id}`}>
                            <h3 className='text-2xl'>{product.name}</h3>
                        </Link>
                        <div className="flex justify-center items-center">
                            <div className='h-3 w-3 bg-white rounded-full'></div>
                            <p className='text-xl ps-2'>{product.description}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No Products </p>
            )}
        </div>
    );
}

export default Products;


// {
//     "products": [
//         {
//             "id": 1,
//             "name": "Product 1",
//             "description": "Product One description"
//         },
//         {
//             "id": 2,
//             "name": "Product 2",
//             "description": "Product Two description"
//         },
//         {
//             "id": 3,
//             "name": "Product 3",
//             "description": "Product Three description"
//         },
//         {
//             "id": 4,
//             "name": "Product 4",
//             "description": "Product Four description"
//         }
//     ]
// }