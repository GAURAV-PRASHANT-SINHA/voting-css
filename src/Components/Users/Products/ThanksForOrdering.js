import { Link } from "react-router-dom";
import file from'./file.png'
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$36.00",
    color: "Charcoal",
    size: "L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-06-product-01.jpg",
    imageAlt: "Model wearing men's charcoal basic tee in large.",
  },
  // More products...
];

export default function ThanksForOrdering() {
  return (
    <>
  <div className="h-full w-full flex flex-col items-center justify-center text-center bg-gray-100 p-8 rounded-lg">
    <h1 className="text-2xl font-bold text-green-600 mb-4">THANKS FOR ORDERING</h1>
    <p className="text-lg text-gray-700">We appreciate your order and look forward to serving you again!</p>
    <button
      className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      onClick={() => window.location.reload()}
    >
     You should Order Again Sometime
    </button>
  </div>
</>

  );
}