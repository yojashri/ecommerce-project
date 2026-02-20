import { notFound } from "next/navigation"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}

interface Props {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    )

    if (!res.ok) return null

    return await res.json()
  } catch {
    return null
  }
}

export default async function ProductPage({ params }: Props) {

  const { id } = await params
  const product = await getProduct(id)

  if (!product) notFound()

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-100 dark:bg-gray-900">

      <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-3xl w-full text-center">

        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          ✕
        </Link>

        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain mx-auto mb-6"
        />

        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          {product.title}
        </h2>

        <p className="text-xl font-semibold mb-4 dark:text-white">
          ${product.price}
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

      </div>
    </main>
  )
}