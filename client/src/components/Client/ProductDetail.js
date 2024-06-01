import React from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  // Fake product data
  const products = [
    {
      id: 33,
      eyeGlassTypeId: 1,
      glassType: null,
      glassName: "KÍNH RÂM THỜI TRANG EYE PLUS 2164 C101 GỌNG NÂU MẮT NÂU",
      glassDescription:
        "Kính râm thời trang Eye Plus 2164 mang đến trải nghiệm mới mẻ, độc đáo. Phiên bản này được thiết kế form dáng Pilot kết hợp với gam màu mắt nâu thời thượng, tinh tế. Gọng sử dụng chất liệu kim loại cao cấp, mang đến các đặc tính ưu việt cho sản phẩm như: độ cứng cơ học cao, chịu nhiệt tốt, không bị tác động trước các điều kiện môi trường, bề mặt đen nhám trơn, …\r\n\r\nNgoài ra, kích thước mắt kính bản to càng tô lên vẻ thời trang cho người sử dụng. Tròng râm được trang bị đầy đủ tính năng của một chiếc kính râm chất lượng, chống chói lóa, chống tia UV, tạo cảm giác thoải mái cho mắt khi tiếp xúc với ánh nắng mặt trời.",
      glassPrice: 550,
      quantity: 100,
      color: "Brown",
      status: true,
      images: [
        "https://via.placeholder.com/400x400",
        "https://via.placeholder.com/400x400",
        "https://via.placeholder.com/400x400",
      ],
      rating: 4,
      sizes: ["Small", "Medium", "Large"],
    },
    {
      id: 34,
      eyeGlassTypeId: 3,
      glassType: null,
      glassName: "Test 1",
      glassDescription: "Test1",
      glassPrice: 100,
      quantity: 100,
      color: "black",
      status: true,
      images: [
        "https://via.placeholder.com/400x400",
        "https://via.placeholder.com/400x400",
        "https://via.placeholder.com/400x400",
      ],
      rating: 3,
      sizes: ["Small", "Medium", "Large"],
    },
  ];

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-8  mt-10">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4">
          <div className="flex flex-wrap -mx-2">
            {product.images.map((image, index) => (
              <div key={index} className="w-1/2 p-2">
                <img
                  src={image}
                  alt={product.glassName}
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-bold mb-4">{product.glassName}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`mr-1 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-2xl font-semibold mb-4 text-primary">
            ${product.glassPrice}
          </p>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {product.glassDescription}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Colors</h3>
            <div className="flex space-x-2">
              <span
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: product.color }}
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className="py-2 px-4 border rounded-full hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
