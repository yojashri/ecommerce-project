import Link from "next/link"
import { Product } from "@/types/product"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition">
      <img
        src={product.image}
        className="h-48 w-full object-contain mb-4"
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="font-bold">${product.price}</p>

      <Link
        href={`/products/${product.id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  )
}