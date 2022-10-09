const [limit, setLimit] = useState(5);
const [search, setSearch] = useState(null);
const [pageRange, setPageRange] = useState({
  page: 1,
  totalToShow: 1,
});
const data = useSelector((state) => state.data);
// const paginate = data?.paginate;
const { members, paginate, isLoading } = data;
console.log("paginate", paginate);

const [currentItems, setCurrentItems] = useState(null);
const [pageCount, setPageCount] = useState(0);
// Here we use item offsets; we could also use page offsets
// following the API or data you're working with.
const [itemOffset, setItemOffset] = useState(0);
const itemsPerPage = limit;

useEffect(() => {
  // Fetch items from another resources.
  const endOffset = itemOffset + itemsPerPage;
  console.log('endOffset', endOffset)
  console.log('itemOffset', itemOffset)
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  setCurrentItems(members?.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(paginate?.totalItems / itemsPerPage));
}, [itemOffset, itemsPerPage, members]);

// Invoke when user click to request another page.
const handlePageClick = (event) => {
  console.log('event', event)

  const newOffset = (event.selected * itemsPerPage) % paginate?.totalItems;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  if(event.selected){
    GetMembers(true, event.selected, limit);
  }
  setItemOffset(newOffset);
};

const range = (start, stop, step) =>
  Array.from(
    {
      length: (stop - start) / step + 1,
    },
    (_, i) => start + i * step
  );

const movePage = (currentPage) => {
  // GetLoans(true, currentPage, paginate?.size);
  console.log("currentPage", currentPage);
};
const nextPage = (next) => {
  console.log("next", next);
  if (paginate?.nextNumber && paginate?.nextNumber !== paginate?.page) {
    // GetLoans(true, paginate?.nextNumber, paginate?.size);
  }
};
const previousPage = (previous) => {
  console.log("previous", previous);
  if (paginate?.previousNumber) {
    // GetLoans(true, paginate?.previousNumber, paginate?.size);
  }
};