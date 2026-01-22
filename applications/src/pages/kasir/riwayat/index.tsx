import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ContainerHeaderPage,
  HeaderTitle,
} from "../../../components/UI/component-header-page";
import { Card } from "../../../components/UI/Card";
import { DataTable } from "../../../components/UI/DataTable";
import {
  HeaderTableContainer,
  HeaderTableSearch,
} from "../../../components/UI/header-table";
import { EmptyNoData, EmptyNoResults } from "../../../components/UI/EmptyState";

import { getUserColumns } from "../../../columns/userColumns";
import ApiClient from "../../../utils/apiClient";
import { getTransactionColumns } from "../../../columns/transactionColumns";
import { useAuth } from "../../../context/AuthContext";

const Pengguna = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
  });

  const getData = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.get("/transaction");
      setData(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openDetail = (row: any) => {
    navigate(`/${user.role}/riwayat-penjualan/detail/${row.id}`);
  };


  const columns = getTransactionColumns({
  openDetail,
  isLoading: loading,
});


  const filteredData = data.filter((item) =>
    JSON.stringify(item)
      .toLowerCase()
      .includes(filters.search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <ContainerHeaderPage className="mb-5">
        <HeaderTitle>Riwayat Penjualan</HeaderTitle>
      </ContainerHeaderPage>

      <Card>
        <HeaderTableContainer>
          <HeaderTableSearch
            value={filters.search}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, search: val }))
            }
            onSearch={(val) =>
              setFilters((prev) => ({
                ...prev,
                page: 1,
                search: val,
              }))
            }
            placeholder="Cari riwayat penjualan..."
          />
        </HeaderTableContainer>

        <DataTable
          columns={columns}
          data={filteredData}
          isLoading={loading}
          noDataComponent={<EmptyNoData onRefresh={getData} />}
          noResultsComponent={<EmptyNoResults onRefresh={getData} />}
          page={filters.page}
          pageSize={10}
          total={filteredData.length}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </Card>
    </div>
  );
};

export default Pengguna;
