import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react';
import { type PaginationState, type SortingState } from '@tanstack/react-table';
import { type ViewAllGuestsFilterSchema } from '../schema/view-all-guest-filters';
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
        <div className="flex gap-2 ">
          <div className='flex align-baseline w-full space-x-2 items-center'>
            <div className='w-full'>
              <Search
                value={search}
                placeholder="Search by first name"
              />
            </div>
            <div className='flex space-x-2'>
              <Button className="h-12 rounded-full" onClick={() => {
                navigate({ to: "/guests/new" })
              }}>
                <span>+ New guest</span>
              </Button>
              <Button className='h-12' onClick={() => setShowFiltersPanel(true)}><span className="material-symbols-outlined ">
                filter_alt
              </span></Button>

            </div>
          </div>
        </div>
        <div >
          <Outlet />
        </div>


        <div className="mt-10 h-[calc(100vh-220px)] overflow-y-auto">
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
