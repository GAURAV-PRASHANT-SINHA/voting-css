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
       <img
            src={file}
            alt="TODO"
            className="h-full w-full object-cover object-center"
          />
    </>
  );
}