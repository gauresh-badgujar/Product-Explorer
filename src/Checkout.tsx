import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "./api";
import { formatINR } from "./format";
import { useCart } from "./CartContext";
import { navigate, type Route } from "./router";
import "./Cart.css";

type CheckoutRoute = Extract<Route, { name: "checkout" }>;

export function CheckoutPage({ buyNow }: { buyNow?: CheckoutRoute["buyNow"] }) {
  const { items: cartItems, clearCart } = useCart();

  const { data: buyNowProduct, isLoading } = useQuery({
    queryKey: ["product", buyNow?.productId],
    queryFn: () => fetchProduct(buyNow!.productId),
    enabled: !!buyNow,
  });

  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => `ORD-${Date.now().toString().slice(-8)}`);

  if (buyNow && isLoading) return <p className="status">Loading order…</p>;

  const orderItems = buyNow
    ? buyNowProduct
      ? [{ product: buyNowProduct, qty: buyNow.qty }]
      : []
    : cartItems;

  const total = orderItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const validPincode = /^[1-9][0-9]{5}$/.test(pincode);
  const canPlaceOrder = name.trim().length > 1 && validPincode && orderItems.length > 0;

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return;
    if (!buyNow) clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="cart-page">
        <div className="checkout-success">
          <h1>Order placed!</h1>
          <p>
            Your order <strong>{orderId}</strong> has been placed successfully.
          </p>
          <button className="pd-btn pd-btn-buy" onClick={() => navigate({ name: "list" })}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Checkout</h1>
        <p className="status">There's nothing to check out.</p>
        <button className="pd-btn pd-btn-buy" onClick={() => navigate({ name: "list" })}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Checkout</h1>

      <ul className="cart-list checkout-list">
        {orderItems.map(({ product, qty }) => (
          <li className="cart-item" key={product.id}>
            <img src={product.thumbnail} alt={product.title} className="cart-item-thumb" />
            <div className="cart-item-info">
              <span className="cart-item-title">{product.title}</span>
              <span className="cart-item-price">
                {formatINR(product.price)} × {qty}
              </span>
            </div>
            <span className="cart-item-subtotal">{formatINR(product.price * qty)}</span>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span>Order Total</span>
        <span className="cart-total">{formatINR(total)}</span>
      </div>

      {/* ponytail: no payment gateway wired up; this simulates the order-placement step. */}
      <div className="checkout-form">
        <h2>Delivery Details</h2>
        <label>
          Full Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </label>
        <label>
          Delivery Pincode
          <input
            value={pincode}
            inputMode="numeric"
            maxLength={6}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="6-digit pincode"
          />
        </label>
        <button className="pd-btn pd-btn-buy" onClick={handlePlaceOrder} disabled={!canPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}
