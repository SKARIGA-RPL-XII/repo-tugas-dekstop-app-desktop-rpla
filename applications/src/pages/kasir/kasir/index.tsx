import { SearchInput } from "../../../components/UI/SearchInput";
import Pagination from "./Pagination";
import CardProduct from "./CardProduct";
import { IdCard } from "lucide-react";
import { Input } from "../../../components/UI/Input";
export default function Kasir() {
  return (
    <>
      <div className="w-full flex gap-6">
        <div className="py-7.5 px-6.25 w-1/2 bg-white rounded-2xl">
          <div className="flex justify-between mb-7">
            <div className="">
              <h1 className="text-l font-semibold text-[#000405]">
                Selamat Datang, Harry Potter
              </h1>
              <p className="text-xs text-[#000405B2]">12 Desember 2026</p>
            </div>
            <div className="relative">
              <SearchInput />
            </div>
          </div>
          <div className="w-full flex flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap mb-9">
            <h4 className="bg-[#3A47B0] w-fit py-1.5 px-3 rounded-full text-xs text-white font-semibold mr-2">
              Semua Kategori
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Makanan
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Minuman
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Semua Kategori
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Semua Kategori
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Semua Kategori
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Semua Kategori
            </h4>
            <h4 className="bg-none w-fit py-1.5 px-3 rounded-full text-xs text-black/60 font-normal mr-2">
              Semua Kategori
            </h4>
          </div>
          <div className="w-full grid grid-cols-3 gap-6">
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </div>
        <div className="w-1/2">
          <div className="py-7.5 px-6  w-full bg-white rounded-2xl">
            <h2 className="font-semibold text-[14px] flex gap-2 mb-7.5">
              <IdCard className="w-6 h-6" /> Informasi Pembeli
            </h2>
            <label className="text-l">Nama Pembeli*</label>
            <Input/>
          </div>
        </div>
      </div>
    </>
  );
}
