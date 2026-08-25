import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api";
import { formatINR } from "./format";
import { useCart } from "./CartContext";
import { useRoute, navigate } from "./router";
import { ProductDetailsPage } from "./ProductDetails";
import { CartPage } from "./Cart";
import { CheckoutPage } from "./Checkout";
import "./App.css";

function ProductList({ initialCategory }: { initialCategory?: string }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory ?? "all");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = data?.products ?? [];

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category)
  );

  return (
    <>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing…" : "Refresh Products"}
        </button>
      </div>

      {isLoading && <p className="status">Loading products…</p>}

      {isError && (
        <p className="status error">
          Error: {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="status">No Products Found</p>
      )}

      <div className="grid">
        {filtered.map((p) => (
          <div
            className="product"
            key={p.id}
            onClick={() => navigate({ name: "product", id: p.id })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate({ name: "product", id: p.id })}
          >
            <div className="thumb">
              <img src={p.thumbnail} alt={p.title} loading="lazy" />
            </div>
            <span className="category">{p.category}</span>
            <h3>{p.title}</h3>
            <div className="row">
              <span className="price">{formatINR(p.price)}</span>
              <span className="rating">★ {p.rating.toFixed(1)}</span>
            </div>
            <span
              className={
                "stock " + (p.stock === 0 ? "out" : p.stock < 10 ? "low" : "in")
              }
            >
              {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  const route = useRoute();
  const { count } = useCart();

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => navigate({ name: "list" })} role="button" tabIndex={0}>
          Product Explorer
        </h1>
        <button className="cart-badge" onClick={() => navigate({ name: "cart" })} aria-label="View cart">
          🛒 Cart{count > 0 ? ` (${count})` : ""}
        </button>
      </header>

      {route.name === "list" && (
        <ProductList key={route.category ?? "all"} initialCategory={route.category} />
      )}
      {route.name === "product" && <ProductDetailsPage id={route.id} />}
      {route.name === "cart" && <CartPage />}
      {route.name === "checkout" && <CheckoutPage buyNow={route.buyNow} />}
    </div>
  );
}

export default App;
