// Debug cart functionality
console.log("Checking localStorage for cart data...");
const cartData = localStorage.getItem("kwebstore-cart");
console.log("Cart data in localStorage:", cartData);

if (cartData) {
  try {
    const parsed = JSON.parse(cartData);
    console.log("Parsed cart data:", parsed);
  } catch (error) {
    console.error("Error parsing cart data:", error);
  }
} else {
  console.log("No cart data found in localStorage");
}
