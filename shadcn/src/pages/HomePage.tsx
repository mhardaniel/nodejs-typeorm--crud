import { Link } from "react-router-dom"
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="w-full p-5">
        <h1 className="text-2xl mb-5 text-center">Current Products</h1>

        {products.length > 0 ? (
          <div data-cy="product-list" className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (

          <span data-cy="empty-products" className="flex justify-center gap-2">No products found 😢<Link to={"create"} className="text-blue-500 hover:underline"> Create a product </Link></span>

        )}
      </div>
    </div>
  )
}

export default HomePage
