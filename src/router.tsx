import { useEffect, useState } from "react";

export type Route =
  | { name: "list"; category?: string }
  | { name: "product"; id: number }
  | { name: "cart" }
  | { name: "checkout"; buyNow?: { productId: number; qty: number } };

// ponytail: hand-rolled router for 4 fixed routes; swap for react-router if routes grow beyond this.
function parseLocation(): Route {
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  const productMatch = path.match(/^\/product\/(\d+)$/);
  if (productMatch) return { name: "product", id: Number(productMatch[1]) };

  if (path === "/cart") return { name: "cart" };

  if (path === "/checkout") {
    const productId = params.get("productId");
    const qty = params.get("qty");
    if (productId && qty) {
      return {
        name: "checkout",
        buyNow: { productId: Number(productId), qty: Number(qty) },
      };
    }
    return { name: "checkout" };
  }

  const category = params.get("category");
  return category ? { name: "list", category } : { name: "list" };
}

function routeToUrl(route: Route): string {
  switch (route.name) {
    case "product":
      return `/product/${route.id}`;
    case "cart":
      return "/cart";
    case "checkout":
      return route.buyNow
        ? `/checkout?productId=${route.buyNow.productId}&qty=${route.buyNow.qty}`
        : "/checkout";
    default:
      return route.category ? `/?category=${encodeURIComponent(route.category)}` : "/";
  }
}

const NAVIGATE_EVENT = "app-navigate";

export function navigate(route: Route) {
  window.history.pushState(null, "", routeToUrl(route));
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo(0, 0);
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseLocation);

  useEffect(() => {
    const onChange = () => setRoute(parseLocation());
    window.addEventListener("popstate", onChange);
    window.addEventListener(NAVIGATE_EVENT, onChange);
    return () => {
      window.removeEventListener("popstate", onChange);
      window.removeEventListener(NAVIGATE_EVENT, onChange);
    };
  }, []);

  return route;
}
