import { Plus } from "lucide-react";
import { Separator } from "../../../components/UI/Separator";

export default function CardProduct({ product, onAdd }) {
  return (
    <div className="w-full p-2 border border-[#D9D9D9] rounded-[8px]">
      <div className="w-full p-5 bg-[#F6F6F6] rounded-[8px] mb-2.5 relative">
        <button
          onClick={() => onAdd(product)}
          className="text-white absolute top-0 right-0 bg-[#009966] rounded-full p-1"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div
          className="w-full h-25 bg-center bg-cover rounded-md"
          style={{ backgroundImage: `url(${product.url_image})` }}
        />
      </div>

      <div className="px-1">
        <h2 className="text-xs text-[#000405B2] mb-1.5">{product.category_id}</h2>
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
