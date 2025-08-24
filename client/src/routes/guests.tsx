import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react';
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { type ViewAllGuestsFilterSchema } from '../schema/view-all-guests';
import { useSelector } from 'react-redux';
import { selectGuestFilters, selectSearch } from '../state/guest-slice';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/guest-table/data-table';
import Loader from '@/components/loader';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { fetchGuestList } from '@/api/guest';
import { columns } from '@/components/guest-table/columns';
import GuestFilterSheet from '@/components/guest/filter-panel';


const Guests = () => {
  const navigate = useNavigate();
  const search = useSelector(selectSearch);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "email", desc: true }
  ]);
  const guestFilters = useSelector(selectGuestFilters);




  const memoizedData = useMemo(() => {
    const body: ViewAllGuestsFilterSchema = {};

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
    queryKey: ['guests', { filters: memoizedData }],
    queryFn: () => fetchGuestList(memoizedData),
  });




  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;



  return (
    <>
      <div className="px-4">
        <div className="flex gap-2">
          <div>
            <Search
              value={search}
              placeholder="Search Name and Contact"
            />
          </div>
          <div>
            <Button className="h-[40px]" onClick={() => {
              navigate({ to: "/guests/new" })
            }}>
              <div className="flex gap-2">
                Add Guest
              </div>
            </Button>
          </div>
          <div>
            <Outlet />
          </div>
        </div>



        <div className="mt-10 h-[calc(100vh-220px)] overflow-y-auto scrollbar pe-2">
          <DataTable
            data={data ?? []}
            columns={columns}
            pagination={pagination}
            pageCount={data ? data.length : 0}
            sorting={sorting}
            setSorting={setSorting}
            onRowClick={(rowData) => {
              navigate({
                to: '/guests/$id',
                params: { id: rowData.id },
              });
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
