import { useCart } from "./CartContext";
import { formatINR } from "./format";
import { navigate } from "./router";
import "./Cart.css";

export function CartPage() {
  const { items, updateQty, removeFromCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p className="status">Your cart is empty.</p>
        <button className="pd-btn pd-btn-buy" onClick={() => navigate({ name: "list" })}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {items.map(({ product, qty }) => (
          <li className="cart-item" key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="cart-item-thumb"
              onClick={() => navigate({ name: "product", id: product.id })}
            />
            <div className="cart-item-info">
              <span
                className="cart-item-title"
                onClick={() => navigate({ name: "product", id: product.id })}
              >
                {product.title}
              </span>
              <span className="cart-item-price">{formatINR(product.price)}</span>
            </div>
            <div className="pd-qty-stepper">
              <button onClick={() => updateQty(product.id, qty - 1)} disabled={qty <= 1}>
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => updateQty(product.id, qty + 1)} disabled={qty >= product.stock}>
                +
              </button>
            </div>
            <span className="cart-item-subtotal">{formatINR(product.price * qty)}</span>
            <button className="cart-item-remove" onClick={() => removeFromCart(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <span>Total</span>
        <span className="cart-total">{formatINR(total)}</span>
      </div>
      <button className="pd-btn pd-btn-buy" onClick={() => navigate({ name: "checkout" })}>
        Proceed to Checkout
      </button>
    </div>
  );
}
