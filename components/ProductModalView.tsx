import { Product } from "@/types/product"

export default function ProductModalView({ product }: { product: Product }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl max-w-2xl w-full p-6 relative">
        <img
          src={product.image}
          className="max-h-[400px] mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="font-bold mb-2">${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  )
}
