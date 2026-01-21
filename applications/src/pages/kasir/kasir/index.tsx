import { useState, useMemo } from "react";
import { SearchInput } from "../../../components/UI/SearchInput";
import Pagination from "./Pagination";
import CardProduct from "./CardProduct";
import {
  CircleMinus,
  CirclePlus,
  CreditCard,
  IdCard,
  ShoppingCart,
  X,
} from "lucide-react";
import { useToast } from "../../../components/UI/ToastContext";
import NoProducts from "../../../assets/noproducts.png";
import { Input } from "../../../components/UI/Input";
import { useAuth } from "../../../context/AuthContext";
import { Separator } from "../../../components/UI/Separator";
import { useProducts } from "../../../hooks/products/useProducts";
import { useCategories } from "../../../hooks/categories/useCategories";
import { useCashier } from "../../../hooks/cashiers/useCashiers";
import { Button } from "../../../components/UI/Button";

export default function Kasir() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { submitTransaction } = useCashier();

  const {
    data: products = [],
    loading,
    error,
    filters,
    setFilters,
    pages,
    meta,
  } = useProducts({ page: 1, limit: 20 });

  const { data: categoriesData = [], loading: loadingCatgeory } = useCategories(
    { page: 1, limit: 50 },
  );

  const categories = useMemo(
    () => ["Semua Kategori", ...categoriesData.map((cat) => cat.category_name)],
    [categoriesData],
  );

  const filteredProducts = useMemo(() => {
    if (!filters.category_id) return products;
    return products.filter((p) => p.category_id === filters.category_id);
  }, [products, filters.category_id]);

  const [cart, setCart] = useState([]);
  const [buyerName, setBuyerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paidAmount, setPaidAmount] = useState(0);
  const date = new Date();

  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];

  const formatted = `${day} - ${months[date.getMonth()]} - ${year}`;

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const change = paidAmount - total > 0 ? paidAmount - total : 0;

  const handlePayment = async () => {
    if (!buyerName.trim()) {
      addToast({ type: "error", title: "Nama pembeli wajib diisi" });
      return;
    }
    if (!cart.length) {
      addToast({
        type: "error",
        title: "Produk belum dipilih",
        description: "Minimal pilih 1 produk untuk transaksi",
      });
      return;
    }
    if (!paymentMethod) {
      addToast({ type: "error", title: "Metode pembayaran wajib diisi" });
      return;
    }
    if (!paidAmount || paidAmount <= 0) {
      addToast({ type: "error", title: "Jumlah dibayar tidak valid" });
      return;
    }
    if (paidAmount < total) {
      addToast({
        type: "error",
        title: "Jumlah dibayar kurang",
        description: `Total belanja Rp ${total.toLocaleString("id-ID")}`,
      });
      return;
    }

    const payload = {
      user_id: user.id,
      buyer_name: buyerName,
      payment_method: paymentMethod,
      paid_amount: paidAmount,
      total_amount: total,
      items: cart.map((item) => ({
        product_id: item.id,
        qty: item.qty,
      })),
    };

    try {
      await submitTransaction(payload);
      addToast({
        type: "success",
        title: "Transaksi berhasil",
        description: `Kembalian Rp ${change.toLocaleString("id-ID")}`,
      });
      clearCart();
      setBuyerName("");
      setPaidAmount(0);
      setPaymentMethod("cash");
    } catch (err) {
      addToast({
        type: "error",
        title: "Transaksi gagal",
        description: err?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="py-7.5 px-4 md:px-6 w-full lg:w-1/2 bg-white rounded-2xl h-fit">
        <div className="flex flex-col md:flex-row justify-between mb-7 gap-4 md:gap-0">
          <div>
            <h1 className="text-l font-semibold text-[#000405]">
              Selamat Datang, {user?.username}
            </h1>
            <p className="text-xs text-[#000405B2]">{formatted}</p>
          </div>
          <div className="relative w-full md:w-1/2">
            <SearchInput
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
            />
          </div>
        </div>

        <div className="w-full flex flex-nowrap overflow-x-auto overflow-y-hidden whitespace-nowrap mb-9 gap-2">
          <h4
            key="all"
            className={`w-fit py-1.5 px-3 rounded-full text-xs font-semibold cursor-pointer ${
              !filters.category_id
                ? "bg-[#3A47B0] text-white"
                : "bg-none text-black/60 font-normal"
            }`}
            onClick={() =>
              setFilters({ ...filters, category_id: undefined, page: 1 })
            }
          >
            Semua Kategori
          </h4>

          {loadingCatgeory ? (
            Array.from({length:4}).map((_,i) => (
              <div key={i + 1} className="w-full flex items-center">
                <div className="text-sm bg-slate-200 animate-pulse rounded-full w-full h-7"/>
              </div>
            ))
          ) : (
            categoriesData.map((cat) => {
              const active = filters.category_id === cat.id;

              return (
                <h4
                  key={cat.id}
                  onClick={() =>
                    setFilters({ ...filters, category_id: cat.id, page: 1 })
                  }
                  className={`w-fit py-1.5 px-3 rounded-full text-xs cursor-pointer transition
          ${
            active
              ? "bg-[#3A47B0] text-white"
              : "text-black/60 hover:bg-gray-100"
          }
        `}
                >
                  {cat.category_name}
                </h4>
              );
            })
          )}
        </div>

        {loading ? (
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i + 1} className="bg-muted-foreground animate-pulse w-full h-60 rounded-xl"></div>
            ))}
          </div>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : filteredProducts.length === 0 ? (
          <div className="py-14 flex justify-center flex-col items-center">
            <img className="w-25 h-25 mb-5" src={NoProducts} alt="" />
            <h2 className="text-base text-[#00000099]">Belum ada produk</h2>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <CardProduct
                key={product.id}
                product={product}
                onAdd={addToCart}
                removeProduct={removeItem}
                carts={cart}
              />
            ))}
          </div>
        )}

        <Pagination currentPage={meta.page} totalPages={pages} />
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="py-7.5 px-4 md:px-6 w-full bg-white rounded-2xl">
          <h2 className="font-semibold text-[14px] flex gap-2 mb-7.5">
            <IdCard className="w-6 h-6" /> Informasi Pembeli
          </h2>
          <Input
            placeholder="Nama Pembeli"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="mb-3"
          />
        </div>

        <div className="py-7.5 px-4 md:px-6 w-full bg-white rounded-2xl">
          <div className="font-semibold text-[14px] flex justify-between mb-7.5">
            <div className="font-semibold text-[14px] flex gap-2">
              <ShoppingCart className="w-6 h-6" /> Produk Ditambahkan
              <label className="text-[11px] font-semibold text-white w-5 h-5 justify-center flex items-center rounded-full bg-[#5565FF]">
                {cart?.length}
              </label>
            </div>
            {cart.length !== 0 && (
              <button
                className="text-[12px] font-semibold text-[#CA2323] flex gap-1.25"
                onClick={clearCart}
              >
                <X className="w-3.75 h-3.75" />
                Hapus Semua
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="py-14 flex justify-center flex-col items-center">
              <img className="w-25 h-25 mb-5" src={NoProducts} alt="" />
              <h2 className="text-base text-[#00000099]">
                Belum ada produk yang dipilih
              </h2>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.75 rounded-lg border-[0.8px] border-[#D9D9D9] flex items-center flex-row justify-between relative mb-3.75"
              >
                <div className="w-full md:w-1/4">
                  <img
                    className="w-full rounded-xl"
                    src={item.url_image}
                    alt={item.name}
                  />
                </div>
                <div className="w-full ms-4 md:w-2/4 flex flex-col md:justify-center mt-3 md:mt-0">
                  <h2 className="font-semibold text-xs text-[#000405] mb-1.5">
                    {item.product_name}
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
                <div className="w-full md:w-1/4 flex flex-col justify-end mt-3 md:mt-0">
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

        <div className="py-7.5 px-4 md:px-6 w-full bg-white rounded-2xl">
          <h2 className="font-semibold text-[14px] flex mb-7.5 gap-2">
            <CreditCard className="w-6 h-6" /> Pembayaran
          </h2>
          <label className="block mb-2 ml-2 text-xs text-black font-medium">
            Metode Pembayaran
          </label>
          <Input
            placeholder="Cash"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mb-6"
          />
          <label className="block mb-2 ml-2 text-xs text-black font-medium">
            Jumlah Dibayarkan
          </label>
          <Input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
            className="mb-6"
          />
          <label className="block mb-2 ml-2 text-xs text-black font-medium">
            Kembali
          </label>
          <Input
            value={change.toLocaleString("id-ID")}
            readOnly
            className="mb-10"
          />
          <Separator className="mb-6" />
          <div className="flex justify-between mb-10">
            <h2 className="text-base font-semibold text-[#000405]">
              Total Bayar
            </h2>
            <h2 className="text-base font-semibold text-[#5565FF]">
              Rp {total.toLocaleString("id-ID")}
            </h2>
          </div>
          <Button
            onClick={handlePayment}
            disabled={loading || !cart.length}
            className="text-white flex bg-[#5565FF] py-3 w-full rounded-xl justify-center items-center gap-2.5"
          >
            {loading ? "Memproses..." : "Bayar Sekarang"}
          </Button>
        </div>
      </div>
    </div>
  );
}
