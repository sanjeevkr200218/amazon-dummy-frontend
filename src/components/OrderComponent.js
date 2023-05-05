import { useEffect, useState } from "react";

const OrderComponent = ({ totalPrice, cart, quantity, date }) => {
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      const productImageUrls = await Promise.all(
        Object.keys(cart).map((productId) =>
          fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => response.json())
            .then((data) => data.image)
        )
      );
      setProductImages(productImageUrls);
    };
    fetchProductImages();
  }, [cart]);

  if (productImages.length === 0) {
    return null;
  }

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          {" "}
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{date}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <div className="flex space-x-2">
            <p>${totalPrice}</p>
          </div>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500 items-center">
          {quantity} items
        </p>
      </div>

      <div className="p-5 sm:p-10 bg-white">
        <div className="flex space-x-6 overflow-x-auto ">
          {productImages.map((image) => (
            <img
              src={image}
              key={image}
              className="w-10 object-contain sm:h-32 sm:w-24"
              alt="productimage"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
