import { useEffect, useState } from "react";

export const usePagination = ({ id, digital, getProducts, take = 10 }: any) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  useEffect(() => {
    if (digital && id)
      getProducts(id, page, take, search); // Pass the order ID when digital
    else getProducts(page, take, search);
  }, [search, page]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop >= scrollHeight - clientHeight && !isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  return {
    handleScroll,
    setSearch,
    search,
    page,
    setPage,
  };
};
