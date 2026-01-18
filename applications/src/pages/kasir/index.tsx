import { Search } from "lucide-react";
export default function Kasir() {
  return (
    <>
      <div className="py-7.5 px-6.25">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-l font-semibold text-[#000405]">
              Selamat Datang, Harry Potter
            </h1>
            <p className="text-xs text-[#000405B2]">12 Desember 2026</p>
          </div>
          <div className="relative">
            <Search className="absolute w-[14px] h-[14px] top-[7px]  left-[15px]" />
            <input
              type="text" 
              className="border-[#D9D9D9] border-1 rounded-[7px] pl-8.5 p-2 text-[10px]"
              placeholder="Cari Produk"
            />
          </div>
        </div>
      </div>
    </>
  );
}
