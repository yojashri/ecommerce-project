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

const productsPerPage = 9

// Fetch products
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

// Filter + Sort logic
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

if (sort === "low") updated.sort((a, b) => a.price - b.price)
if (sort === "high") updated.sort((a, b) => b.price - a.price)

setFiltered(updated)
setPage(1)

}, [search, category, sort, products])

// Pagination logic
const start = (page - 1) * productsPerPage
const paginated = filtered.slice(start, start + productsPerPage)
const totalPages = Math.ceil(filtered.length / productsPerPage)

return (
<div className="max-w-6xl mx-auto px-4 py-10">

  {/* Controls */}
  <div className="flex flex-wrap gap-4 justify-between mb-8">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="border p-2 rounded"
    />

    <div className="flex gap-3">
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men</option>
        <option value="women's clothing">Women</option>
      </select>

      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>
    </div>
  </div>

  {/* Loading */}
  {loading && <p className="text-center">Loading...</p>}

  {/* No Results */}
  {!loading && filtered.length === 0 && (
    <p className="text-center text-red-500">No products found</p>
  )}

  {/* Grid */}
  {!loading && filtered.length > 0 && (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map(p => (
          <div key={p.id} className="border p-4 rounded">
            <img src={p.image} className="h-40 mx-auto object-contain" />
            <h3 className="font-semibold mt-2">{p.title}</h3>
            <p className="font-bold">${p.price}</p>

            <Link
              href={`/products/${p.id}`}
              className="text-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${
              page === i + 1 ? "bg-black text-white" : ""
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