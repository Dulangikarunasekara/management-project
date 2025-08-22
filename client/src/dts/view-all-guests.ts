export type ViewAllGuestsDTO = {
    page?: number;
    size?: number;
    sortField?:"CREATED_DATE"
    sortDirection?:"ASC" | "DESC";
    searchText?:string;
    firstname?:string,
    bookingDate?:string
}