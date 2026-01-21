import { SearchInput } from "../../../components/UI/SearchInput";
import Pagination from "./Pagination";
import CardProduct from "./CardProduct";
import {
  CircleMinus,
  CirclePlus,
  CreditCard,
  IdCard,
  ShoppingBasketIcon,
  ShoppingCart,
  X,
} from "lucide-react";
import NoProducts from "../../../assets/noproducts.png";
import { Input } from "../../../components/UI/Input";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Separator } from "../../../components/UI/Separator";
export default function Kasir() {
  const { user } = useAuth();

  const dummyProducts = [
    {
      id: 1,
      code: "PR001",
      name: "Keripik Kentang Piattos",
      category: "Makanan",
      price: 120000,
      stock: 120,
      image:
        "https://c.alfagift.id/product/1/1_A10040041513_20240725093615214_base.jpg",
    },
    {
      id: 2,
      code: "PR002",
      name: "Teh Botol Sosro",
      category: "Minuman",
      price: 8000,
      stock: 200,
      image:
        "https://c.alfagift.id/product/1/1_A10040041513_20240725093615214_base.jpg",
    },
    {
      id: 3,
      code: "PR003",
      name: "Indomie Goreng",
      category: "Makanan",
      price: 3500,
      stock: 300,
      image:
        "https://c.alfagift.id/product/1/1_A10040041513_20240725093615214_base.jpg",
    },
  ];
  const [products, setProducts] = useState(dummyProducts);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className="w-full flex gap-6 ">
        <div className="py-7.5 px-6.25 w-1/2 bg-white rounded-2xl h-fit">
          <div className="flex justify-between mb-7">
            <div className="">
              <h1 className="text-l font-semibold text-[#000405]">
                Selamat Datang, {user?.username}
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
            {products.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={2} />
        </div>
        <div className="w-1/2">
          <div className="py-7.5 px-6  w-full bg-white rounded-2xl mb-6.5">
            <h2 className="font-semibold text-[14px] flex gap-2 mb-7.5">
              <IdCard className="w-6 h-6" /> Informasi Pembeli
            </h2>
            <label className="text-l mb-2 block">Nama Pembeli</label>
            <Input className="mb-3" />
          </div>

          <div className="py-7.5 px-6  w-full bg-white rounded-2xl mb-6.5">
            <div className="font-semibold text-[14px] flex justify-between mb-7.5">
              <div className="font-semibold text-[14px] flex gap-2 ">
                <ShoppingCart className="w-6 h-6" /> Produk Ditambahkan
                <label className="text-[11px] font-semibold text-white w-5 h-5 bg-[#5565FF] justify-center flex items-center rounded-full">
                  {cart?.length}
                </label>
              </div>
              {cart.length !== 0 && (
                <button
                  className="text-[12px] font-semibold text-[#CA2323] flex gap-1.25"
                  onClick={() => clearCart()}
                >
                  <X className="w-3.75 h-3.75" />
                  Hapus Semua
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="py-14 flex justify-center flex-col items-center ">
                <img className="w-25 h-25 mb-5" src={NoProducts} alt="" />
                <h2 className="text-base text-[#00000099]">
                  {" "}
                  Belum ada produk yang dipilih
                </h2>
              </div>
            ) : (
              cart.map((item) => (
                <div className="p-3.75 rounded-lg border-[0.8px] border-[#D9D9D9] flex justify-center relative mb-3.75">
                  <button
                    className="w-5 h-5 flex absolute right-2 top-2 bg-[#CA2323] rounded-full justify-center items-center text-white"
                    onClick={() => removeItem(item.id)}
                  >
                    {" "}
                    <X className="w-2.5 h-2.5" />
                  </button>
                  <div className="w-1/4">
                    <img
                      className="w-full"
                      src="https://c.alfagift.id/product/1/1_A10040041513_20240725093615214_base.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-2/4">
                    <h1 className="rounded-sm py-1 px-2 w-fit font-semibold text-[10px] text-white mb-2.5 bg-[#5565FF]">
                      {item.code}
                    </h1>
                    <h2 className="font-semibold text-xs   text-[#000405] mb-1.5">
                      {item.name}
                    </h2>
                    <h3 className="text-[#00000099] font-semibold text-[10px] mb-2.5">
                      Rp {item.price.toLocaleString("id-ID")}
                    </h3>
                    <div className="flex px-3.75 py-1.75 bg-[#F6F6F6] rounded-sm w-fit">
                      <button onClick={() => decreaseQty(item.id)}>
                        <CircleMinus />
                      </button>
                      <span className="w-8 text-center">{item.qty}</span>

                      <button onClick={() => increaseQty(item.id)}>
                        <CirclePlus />
                      </button>
                    </div>
                  </div>
                  <div className="w-1/4 flex flex-col justify-end">
                    <h2 className="text-right font-semibold text-xs text-[#00000099] mb-2">
                      Subtotal
                    </h2>
                    <h1 className="text-right text-[#009966] text-base font-semibold">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </h1>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="py-7.5 px-6  w-full bg-white rounded-2xl mb-6.5">
            <h2 className="font-semibold text-[14px] flex mb-7.5 gap-2">
              <CreditCard className="w-6 h-6" /> Pembayaran
            </h2>
            <label className="block mb-2 ml-2 text-xs text-black font-medium">
              Metode Pembayaran
            </label>
            <Input placeholder="Cash" className="mb-6" />
            <label className="block mb-2 ml-2 text-xs text-black font-medium">
              Jumlah Dibayarkan
            </label>
            <Input className="mb-6" />
            <label className="block mb-2 ml-2 text-xs text-black font-medium">
              Kembali
            </label>
            <Input className="mb-10" />
            <Separator className="mb-6" />
            <div className="flex justify-between mb-10">
              <h2 className="text-base font-semibold text-[#000405]">
                Total Bayar
              </h2>
              <h2 className="text-base font-semibold text-[#5565FF]">Rp 0</h2>
            </div>
            <button className="text-white flex bg-[#5565FF] py-3 w-full rounded-xl justify-center items-center gap-2.5">
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.875 0C2.1125 0 1.38124 0.302901 0.842068 0.842068C0.302901 1.38124 0 2.1125 0 2.875V3.83333H19.1667V2.875C19.1667 2.1125 18.8638 1.38124 18.3246 0.842068C17.7854 0.302901 17.0542 0 16.2917 0H2.875ZM19.1667 5.75H0V12.4583C0 13.2208 0.302901 13.9521 0.842068 14.4913C1.38124 15.0304 2.1125 15.3333 2.875 15.3333H16.2917C17.0542 15.3333 17.7854 15.0304 18.3246 14.4913C18.8638 13.9521 19.1667 13.2208 19.1667 12.4583V5.75ZM5.75 10.5417C5.75 10.2875 5.85097 10.0437 6.03069 9.86402C6.21041 9.6843 6.45417 9.58333 6.70833 9.58333H10.9384L10.8225 9.46737C10.6426 9.28768 10.5416 9.04391 10.5415 8.78969C10.5414 8.53548 10.6423 8.29164 10.822 8.11181C11.0017 7.93199 11.2454 7.83092 11.4997 7.83083C11.7539 7.83074 11.9977 7.93164 12.1775 8.11133L13.9294 9.86413C14.109 10.0438 14.21 10.2876 14.21 10.5417C14.21 10.7958 14.109 11.0395 13.9294 11.2192L12.1775 12.971C12.0891 13.0626 11.9834 13.1356 11.8665 13.1858C11.7495 13.236 11.6238 13.2625 11.4966 13.2636C11.3693 13.2647 11.2431 13.2404 11.1253 13.1922C11.0076 13.1441 10.9006 13.0729 10.8106 12.9829C10.7206 12.8929 10.6494 12.7859 10.6013 12.6682C10.5531 12.5504 10.5288 12.4242 10.5299 12.2969C10.531 12.1697 10.5575 12.0439 10.6077 11.927C10.6579 11.8101 10.7309 11.7044 10.8225 11.616L10.9384 11.5H6.70833C6.45417 11.5 6.21041 11.399 6.03069 11.2193C5.85097 11.0396 5.75 10.7958 5.75 10.5417Z"
                  fill="white"
                />
              </svg>
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
