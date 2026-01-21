import { useEffect } from "react";
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

import { useUsers } from "../../../hooks/users/useUsers";
import { getUserColumns } from "../../../columns/userColumns";

const Pengguna = () => {
  const navigate = useNavigate();

  const {
    data,
    meta,
    filters,
    setFilters,
    loading,
    refetch,
  } = useUsers({
    page: 1,
    limit: 10,
    search: "",
  });

  useEffect(() => {
    refetch();
  }, []);

  const openDetail = (user: any) => {
    navigate(`/admin/pengguna/${user.id}/detail`);
  };

  const columns = getUserColumns({
    openDetail,
    isLoading: loading,
  });

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
              setFilters((prev) => ({
                ...prev,
                search: val,
              }))
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
          data={data}
          isLoading={loading}
          noDataComponent={<EmptyNoData onRefresh={refetch} />}
          noResultsComponent={<EmptyNoResults onRefresh={refetch} />}
          page={filters.page}
          pageSize={meta.limit}
          total={meta.count}
          onPageChange={(newPage) =>
            setFilters((prev) => ({
              ...prev,
              page: newPage,
            }))
          }
        />
      </Card>
    </div>
  );
};

export default Pengguna;
