import { Plus } from "lucide-react";
import { Separator } from "../../../components/UI/Separator";

export default function () {
  return (
    <>
      <div className="w-full p-2 border border-[#D9D9D9] rounded-[8px] ">
        <div className="w-full p-5 bg-[#F6F6F6] rounded-[8px] mb-2.5 relative">
          <button className="text-white absolute top-0 right-0 bg-[#009966] rounded-full p-1 ">
            <Plus className=" w-5 h-5" />
          </button>
          <div
            className="w-25 h-25 mx-auto bg-center bg-cover rounded-md"
            style={{
              backgroundImage: `url(https://c.alfagift.id/product/1/1_A10040041513_20240725093615214_base.jpg)`,
            }}
          />
        </div>
        <div className="px-0.75">
          <h2 className="text-xs text-[#000405B2] mb-1.5">Makanan</h2>
          <h1 className="text-l text-[#000405] font-semibold mb-4">
            Keripik Kentang Piattos
          </h1>
          <Separator />
          <div className="flex mt-4 justify-between">
            <h6 className="text-xs text-[#5565FF]">Stok: 120</h6>
            <h6 className="text-xs text-[#009966] font-semibold">Rp 120.000</h6>
          </div>
        </div>
      </div>
    </>
  );
}
