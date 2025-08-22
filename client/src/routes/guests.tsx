import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState, useEffect } from 'react';
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { type ViewAllGuestsDTO } from '../dts/view-all-guests';
import { useSelector } from 'react-redux';
import { selectGuestFilters } from '../state/guest-slice';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/guest-table/data-table';
import Pagination from '@/components/pagination';
import Loader from '@/components/loader';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { fetchGuestList } from '@/api/guest';
import { columns } from '@/components/guest-table/columns';
import GuestFilterSheet from '@/components/guest/filter-panel';
import { gu } from 'date-fns/locale';

const Guests = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "email", desc: false }
  ]);
  const guestFilters = useSelector(selectGuestFilters);
  // const filters = { email: "dulangi2002@gmail.com" };



  const memoizedData = useMemo(() => {
    const body: ViewAllGuestsDTO = {
      page: pagination.pageIndex - 1,
      size: pagination.pageSize,
      sortDirection: "DESC",
    };

    if (guestFilters.bookingDate) {
      body.bookingDate = format(
        new Date(guestFilters.bookingDate),
        "yyyy-MM-dd"
      );
    }

    if (search) {
      body.searchText = search;
    }
    return body;
  }, [search, pagination, guestFilters]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['guests', memoizedData],
    queryFn: () => fetchGuestList(memoizedData),
  });



  // // Debug effect to log data changes
  // useEffect(() => {
  //   console.log(guestFilters.bookingDate)
  // }, [guestFilters.bookingDate]);

  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  // const onViewGuest = (id: string) => {
  //   navigate({
  //     to: '/guests/$id',
  //     params: { id }
  //   })
  // }

  // const onAddGuest = () => {

  // }

  // Debug render
  console.log("Rendering with data:", data);

  return (
    <>
      <div className="px-4">
        <div className="flex gap-2">
          <div>
            <Search
              value={search}
              setValue={setSearch}
              placeholder="Search Name and Contact"
            />
          </div>
          <div>
            <Button className="h-[40px]">
              <div className="flex gap-2">
                Add Guest
              </div>
            </Button>
          </div>

        </div>

        {/* Debug display */}
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Debug Info:</h3>
          <p>Data length: {data?.length || 0}</p>
          <p>Sample data: {JSON.stringify(data?.[0], null, 2)}</p>
        </div>

        {/* Alternative simple table for debugging */}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Simple Debug Table:</h3>
          <table className="border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).map((item, index) => (
                <tr key={item.id || index}>
                  <td className="border border-gray-300 p-2">{item.id}</td>
                  <td className="border border-gray-300 p-2">{item.email}</td>
                  <td className="border border-gray-300 p-2">{item.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 h-[calc(100vh-220px)] overflow-y-auto scrollbar pe-2">
          <DataTable
            data={data ?? []}
            columns={columns}
            pagination={pagination}
            pageCount={data ? data.length : 0}
            sorting={sorting}
            setSorting={setSorting}
          />
        </div>

        <div className="mt-4">
          <Pagination
            length={data ? data.length : 0}
            paginationState={pagination}
            onPaginationChange={(paginationState) => {
              setPagination(paginationState);
            }}
          />
        </div>
      </div>
      <Loader show={isLoading} />
      <Button onClick={() => setShowFiltersPanel(true)}>filter</Button>
      <GuestFilterSheet
        show={showFiltersPanel}
        onClose={() => setShowFiltersPanel(false)}
      />
    </>
  )
}

export const Route = createFileRoute('/guests')({
  component: Guests,
})
