"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export default function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [productsPerPage, setProductsPerPage] = useState(9)

  // Fetch Products
  useEffect(() => {
    setLoading(true)

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))

  }, [])

  // Responsive count
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) {
        setProductsPerPage(8)
      } else {
        setProductsPerPage(9)
      }
    }

    updateCount()
    window.addEventListener("resize", updateCount)
    return () => window.removeEventListener("resize", updateCount)
  }, [])

  // Filter + Sort
  useEffect(() => {

    let updated = [...products]

    if (search) {
      updated = updated.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "all") {
      updated = updated.filter(p => p.category === category)
    }

    if (sort === "low") {
      updated.sort((a, b) => a.price - b.price)
    }

    if (sort === "high") {
      updated.sort((a, b) => b.price - a.price)
    }

    setFiltered(updated)
    setPage(1)

  }, [search, category, sort, products])

  const start = (page - 1) * productsPerPage
  const end = start + productsPerPage
  const paginated = filtered.slice(start, end)
  const totalPages = Math.ceil(filtered.length / productsPerPage)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Search + Category + Sort */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded w-full sm:w-64 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-4">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's</option>
            <option value="women's clothing">Women's</option>
            <option value="jewelery">Jewelery</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="">Sort By Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>

        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 text-xl dark:text-white">
          Loading products...
        </div>
      )}

      {/* No Products Found */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-xl text-red-500">
          No Products Found
        </div>
      )}

      {/* Products Grid */}
      {!loading && filtered.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {paginated.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col transition hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 object-contain mb-4"
                />

                <h3 className="font-semibold mb-2 dark:text-white">
                  {product.title}
                </h3>

                <p className="font-bold mb-2 dark:text-white">
                  ${product.price}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="text-blue-600 dark:text-blue-400 mt-auto"
                >
                  View Details
                </Link>
              </div>
            ))}

          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 border rounded dark:border-white ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  )
}