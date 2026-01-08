import { useProduct } from "../hooks/useProduct";

// NOTE!!!!
// INI HANYA SIMULASI HALAMAN TESTING UNTUK FETCH DATA DARI API
// URUTAN PERNARAPAN CLEAN CODE DALAM FRONT END SERVICE -> HOOK -> UI

function TestingPage() {
  const { loading, product } = useProduct();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 gap-3 w-full max-w-5xl px-5">
        {loading
          ? Array.from({ length: 6 }).map((item, _) => (
              <div
              key={_ + 1}
                className="bg-neutral-900 animate-pulse w-full h-full rounded"
              ></div>
            ))
          : product?.map((item, _) => (
              <div
                key={item?.id}
                className="bg-white border rounded-lg hover:scale-105 transition-all duration-300 ease-in-out p-3"
              >
                <h1>{item.name}</h1>
                <h1>{item.category}</h1>
                <h1>{item.stock}</h1>
                <h1>{item.price}</h1>
              </div>
            ))}
      </div>
    </div>
  );
}

export default TestingPage;
