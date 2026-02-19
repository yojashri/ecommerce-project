"use client"

import { useState } from "react"
import { Product } from "@/types/product"
import ProductCard from "./ProductCard"

export default function ProductList({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const [products] = useState(initialProducts)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)

  const perPage =
    typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 9

  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  if (sort === "low") filtered.sort((a, b) => a.price - b.price)
  if (sort === "high") filtered.sort((a, b) => b.price - a.price)

  const totalPages = Math.ceil(filtered.length / perPage)
  const start = (page - 1) * perPage
  const paginated = filtered.slice(start, start + perPage)

  return (
    <div className="max-w-6xl mx-auto p-4">

      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <input
          placeholder="Search products..."
          className="p-2 border rounded"
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        <select
          className="p-2 border rounded"
          onChange={(e) => {
            setSort(e.target.value)
            setPage(1)
          }}
        >
          <option value="">Sort</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  )
}
