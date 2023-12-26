"use client"
import { useEffect, useState } from "react"
function Product({ params }: {
    params: {
        id: string
    }
}) {
    type Product ={
        id:number,
        name:string,
        description : string
    }
    const [product, setProduct] = useState<Product>()
    async function getProduct(id:string) {
        try {
            const res = await fetch(`http://localhost:8080/products/${id}`)
            const result = await res.json()
            setProduct(result)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getProduct(params.id)
    }, [])
    return (
        <div className="flex flex-col mt-6">
            <h1 className="text-3xl">Product Details</h1>
            <p className="text-xl">{product?.name}</p>
            <p>{product?.description}</p>
        </div>
    )
}

export default Product