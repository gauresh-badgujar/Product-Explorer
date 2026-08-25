import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProductsByCategory } from "./api";
import { formatINR } from "./format";
import { useCart } from "./CartContext";
import { navigate } from "./router";
import { Stars } from "./Stars";
import "./ProductDetails.css";

// ponytail: no real courier API available; delivery estimate is a deterministic
// simulation from the pincode digits, not a live serviceability check.
function checkPincode(pincode: string, price: number) {
  const digitSum = pincode.split("").reduce((s, d) => s + Number(d), 0);
  const serviceable = digitSum % 10 !== 0; // ~90% of pincodes "serviceable"
  const days = 2 + (digitSum % 5);
  const eta = new Date();
  eta.setDate(eta.getDate() + days);
  const etaLabel = eta.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const freeDelivery = price >= 500;
  return { serviceable, etaLabel, freeDelivery };
}

export function ProductDetailsPage({ id }: { id: number }) {
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <p className="status">Loading product…</p>;
  if (isError || !product)
    return <p className="status error">Could not load this product.</p>;

  return <ProductDetailsView product={product} />;
}

function ProductDetailsView({ product }: { product: import("./types").Product }) {
  const { addToCart } = useCart();
  const images = product.images?.length ? product.images : [product.thumbnail];

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [delivery, setDelivery] = useState<ReturnType<typeof checkPincode> | null>(null);
  const [toast, setToast] = useState("");

  const outOfStock = product.stock === 0;

  const originalPrice = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : undefined;
  const savings = originalPrice ? originalPrice - product.price : 0;

  const highlights = useMemo(() => {
    const items: string[] = [];
    if (product.warrantyInformation) items.push(product.warrantyInformation);
    if (product.shippingInformation) items.push(product.shippingInformation);
    if (product.returnPolicy) items.push(product.returnPolicy);
    if (product.minimumOrderQuantity && product.minimumOrderQuantity > 1) {
      items.push(`Minimum order quantity: ${product.minimumOrderQuantity}`);
    }
    product.tags?.forEach((t) => items.push(t.charAt(0).toUpperCase() + t.slice(1)));
    return items;
  }, [product]);

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    { label: "SKU", value: product.sku },
    { label: "Weight", value: product.weight ? `${product.weight}` : undefined },
    {
      label: "Dimensions",
      value: product.dimensions
        ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
        : undefined,
    },
    { label: "Warranty", value: product.warrantyInformation },
  ].filter((s) => s.value);

  const { data: related } = useQuery({
    queryKey: ["related", product.category],
    queryFn: () => fetchProductsByCategory(product.category),
    enabled: !!product.category,
  });
  const relatedProducts = (related?.products ?? []).filter((p) => p.id !== product.id).slice(0, 6);

  const reviews = product.reviews ?? [];
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  const handleQty = (delta: number) => {
    setQty((q) => Math.max(1, Math.min(product.stock, q + delta)));
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setToast("Added to cart successfully.");
    window.setTimeout(() => setToast(""), 2200);
  };

  const handleBuyNow = () => {
    navigate({ name: "checkout", buyNow: { productId: product.id, qty } });
  };

  const handleCheckPincode = () => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setPincodeError("Enter a valid 6-digit pincode.");
      setDelivery(null);
      return;
    }
    setPincodeError("");
    setDelivery(checkPincode(pincode, product.price));
  };

  return (
    <div className="pd">
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <button onClick={() => navigate({ name: "list" })}>Home</button>
        <span>/</span>
        <button onClick={() => navigate({ name: "list", category: product.category })}>
          {product.category}
        </button>
        <span>/</span>
        <span className="pd-breadcrumb-current">{product.title}</span>
      </nav>

      {toast && <div className="pd-toast">{toast}</div>}

      <div className="pd-main">
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={images[activeImage]} alt={product.title} />
          </div>
          {images.length > 1 && (
            <div className="pd-thumbs">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  className={i === activeImage ? "pd-thumb active" : "pd-thumb"}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.title}</h1>
          {product.brand && <p className="pd-brand">by {product.brand}</p>}

          <div className="pd-rating-row">
            <Stars value={product.rating} size="md" />
            <span className="pd-rating-value">{product.rating.toFixed(1)}</span>
            {reviews.length > 0 && (
              <span className="pd-review-count">
                ({reviews.length} review{reviews.length === 1 ? "" : "s"})
              </span>
            )}
          </div>

          <div className="pd-price-block">
            <span className="pd-price">{formatINR(product.price)}</span>
            {originalPrice && (
              <>
                <span className="pd-mrp">MRP {formatINR(originalPrice)}</span>
                <span className="pd-discount">{Math.round(product.discountPercentage!)}% OFF</span>
              </>
            )}
          </div>
          {savings > 1 && <p className="pd-savings">You save {formatINR(savings)}</p>}

          <p className={"pd-stock " + (outOfStock ? "out" : product.stock < 10 ? "low" : "in")}>
            {outOfStock
              ? "Out of stock"
              : product.availabilityStatus ?? `${product.stock} in stock`}
          </p>
          {product.sku && <p className="pd-sku">SKU: {product.sku}</p>}

          <div className="pd-divider" />

          <div className="pd-delivery">
            <label htmlFor="pincode">Delivery</label>
            <div className="pd-pincode-row">
              <input
                id="pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              />
              <button onClick={handleCheckPincode}>Check</button>
            </div>
            {pincodeError && <p className="pd-pincode-error">{pincodeError}</p>}
            {delivery &&
              (delivery.serviceable ? (
                <p className="pd-delivery-result ok">
                  Delivery by {delivery.etaLabel}
                  {delivery.freeDelivery ? " · Free delivery" : " · ₹49 delivery charge"}
                </p>
              ) : (
                <p className="pd-delivery-result fail">Not deliverable to this pincode.</p>
              ))}
          </div>

          <div className="pd-divider" />

          <div className="pd-qty-row">
            <span>Quantity</span>
            <div className="pd-qty-stepper">
              <button onClick={() => handleQty(-1)} disabled={qty <= 1 || outOfStock} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => handleQty(1)}
                disabled={qty >= product.stock || outOfStock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="pd-actions">
            <button className="pd-btn pd-btn-cart" onClick={handleAddToCart} disabled={outOfStock}>
              Add to Cart
            </button>
            <button className="pd-btn pd-btn-buy" onClick={handleBuyNow} disabled={outOfStock}>
              Buy Now
            </button>
          </div>

          {highlights.length > 0 && (
            <>
              <div className="pd-divider" />
              <div className="pd-highlights">
                <h2>Highlights</h2>
                <ul>
                  {highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {product.description && (
        <section className="pd-section">
          <h2>Product Description</h2>
          <p className="pd-description">{product.description}</p>
        </section>
      )}

      {specs.length > 0 && (
        <section className="pd-section">
          <h2>Specifications</h2>
          <dl className="pd-specs">
            {specs.map((s) => (
              <div className="pd-specs-row" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="pd-section">
        <h2>Ratings &amp; Reviews</h2>
        <div className="pd-reviews-summary">
          <div className="pd-reviews-overall">
            <span className="pd-reviews-score">{product.rating.toFixed(1)}</span>
            <Stars value={product.rating} size="md" />
            <span className="pd-review-count">{reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
          </div>
          {reviews.length > 0 && (
            <div className="pd-reviews-distribution">
              {distribution.map((d) => (
                <div className="pd-dist-row" key={d.star}>
                  <span>{d.star}★</span>
                  <div className="pd-dist-bar">
                    <div
                      className="pd-dist-fill"
                      style={{ width: `${(d.count / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span>{d.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="status">No reviews yet.</p>
        ) : (
          <ul className="pd-review-list">
            {reviews.map((r, i) => (
              <li key={i} className="pd-review">
                <div className="pd-review-head">
                  <Stars value={r.rating} />
                  <span className="pd-review-name">{r.reviewerName}</span>
                  <span className="pd-review-date">
                    {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <p className="pd-review-text">{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="pd-section">
          <h2>Similar Products</h2>
          <div className="grid">
            {relatedProducts.map((p) => (
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
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
