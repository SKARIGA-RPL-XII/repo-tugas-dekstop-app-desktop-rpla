import { Minus, Plus } from "lucide-react";
import { Separator } from "../../../components/UI/Separator";
import { Button } from "../../../components/UI/Button";

export default function CardProduct({ product, onAdd , removeProduct , carts }) {
    const isInCart = carts?.some((item) => item.id === product.id);

  return (
    <div className="w-full p-2 border border-[#D9D9D9] rounded-[8px]">
      <div className="w-full h-auto min-h-40 max-h-40 bg-[#F6F6F6] rounded-[8px] mb-2.5 relative overflow-hidden">
      {isInCart ? (
        <Button
          onClick={() => removeProduct(product.id)}
          className="absolute top-0 right-0 z-10 text-white bg-red-500 hover:bg-red-600 rounded-full p-1"
        >
          <Minus/>
        </Button>
      ) : (
        <Button
          onClick={() => onAdd(product)}
          className="absolute top-0 right-0 z-10 text-white bg-[#009966] hover:bg-[#028a5d] rounded-full p-1"
        >
          <Plus/>
        </Button>
      )}

        <img
          src={product.url_image}
          alt={product.product_name}
          loading="lazy"
          className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-200 ease-in-out"
        />
      </div>

      <div className="px-1">
        <h2 className="text-xs text-[#000405B2] mb-1.5">
          Category : {product?.categories?.category_name}
        </h2>
        <h1 className="text-sm font-semibold mb-4">{product.product_name}</h1>
        <Separator />
        <div className="flex mt-4 justify-between">
          <span className="text-xs text-[#5565FF]">Stok: {product.stock}</span>
          <span className="text-xs text-[#009966] font-semibold">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}
