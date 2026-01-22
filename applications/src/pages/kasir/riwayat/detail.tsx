import { useNavigate, useParams } from "react-router-dom";
import { User as UserIcon, Mail, Shield, Calendar, Info } from "lucide-react";

import {
  ContainerHeaderPage,
  HeaderTitle,
} from "../../../components/UI/component-header-page";
import { Card } from "../../../components/UI/Card";
import Logo from "../../../assets/logo.png";
import { Button } from "../../../components/UI/Button";
import { formatDate } from "../../../utils/formatDate";
import { useEffect, useState } from "react";
import ApiClient from "../../../utils/apiClient";

/*
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserServices } from "../../../services/userService";
*/

const DetailPengguna = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);

  const getData = async () => {
    try {
      const res = await ApiClient.get(`/transaction/${id}`);
      const data = res.data.data;
      setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full px-6">
      {/* HEADER */}
      <ContainerHeaderPage>
        <HeaderTitle>Detail Transsaction</HeaderTitle>
      </ContainerHeaderPage>

      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-6 gap-6 mt-6">
        <Card className="lg:col-span-4 shadow-none rounded-3xl p-8">
          <img src={Logo} alt="SkarPOS" className="h-10 mb-6" />

          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 text-[16px]">
                No. Invoice: <span>{transaction.invoice_number}</span>
              </p>
            </div>

            <div className="text-right text-xs text-gray-400 text-[16px]">
              <p>{transaction.date}</p>
              <p>{transaction.time}</p>
            </div>
          </div>

          {/* BUYER + CASHIER */}
          <div className="flex justify-between mb-6 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Nama Pembeli</p>
              <p className="text-gray-600">{transaction.buyer}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-700 mb-1">Nama Kasir</p>
              <p className="text-gray-600">{transaction.cashier}</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500">
                  <th className="py-3 px-3 text-left w-10">#</th>
                  <th className="py-3 px-3 text-left">Nama Produk</th>
                  <th className="py-3 px-3 text-left">Harga</th>
                  <th className="py-3 px-3 text-right">Jumlah Item</th>
                </tr>
              </thead>
              {/* <tbody>
                {transaction.items.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 text-sm text-gray-700"
                  >
                    <td className="py-3 px-3">{index + 1}</td>
                    <td className="py-3 px-3">{item.name}</td>
                    <td className="py-3 px-3">{item.price}</td>
                    <td className="py-3 px-3 text-right">{item.qty}</td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </Card>

        {/* ================= RIGHT (2) ================= */}
        <Card className="lg:col-span-2 shadow-none rounded-3xl p-6 flex flex-col gap-5">
          {/* STATUS */}
          <div className="flex items-center gap-2 bg-green-50 text-green-600 px-3 py-3 rounded-lg text-xs font-medium">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[13px]">
              ✓
            </div>
            Transaksi Berhasil
          </div>

          {/* TITLE */}
          <h3 className="text-lg font-semibold text-gray-800">Ringkasan</h3>

          <hr className="border-gray-100" />

          {/* SUMMARY */}
          <div className="space-y-3 text-sm font-medium">
            <div className="flex justify-between text-gray-600">
              <span>Nama Kasir</span>
              <span className="text-gray-800">{transaction.cashier}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Nama Pembeli</span>
              <span className="text-gray-800">{transaction.buyer}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tgl Transaksi</span>
              <span className="text-gray-800">{transaction.date}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Metode Pembayaran</span>
              <span className="text-gray-800">Cash</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* TOTAL */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">
              Total Harga
            </span>
            <span className="text-lg font-bold text-indigo-600">
              Rp 600.000
            </span>
          </div>

          {/* BUTTON */}
          <Button
            onClick={() => navigate(-1)}
            className="mt-4 h-9 bg-primary text-white text-sm"
          >
            ← Kembali
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DetailPengguna;

/* ================= HELPER ================= */

const InfoRow = ({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) => (
  <div
    className={`flex items-start gap-4 py-4 ${
      !noBorder ? "border-b border-gray-100" : ""
    }`}
  >
    <div className="text-indigo-600 mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm text-gray-700">{value}</p>
    </div>
  </div>
);
