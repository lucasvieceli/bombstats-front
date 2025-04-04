"use client";

export interface IFilters {
  rarity: string[];
  marketplace: string[];
  token: string;
  amount: string;
  order: string;
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface RetailHousesFiltersContextValue {
  filters: IFilters;
  setFilters: (filter: keyof IFilters, newFilters: any) => void;
  setAllFilters: (filter: IFilters) => void;
}

const RetailHousesFiltersContext = createContext(
  {} as RetailHousesFiltersContextValue
);

export function RetailHousesFiltersContextProvider({
  children,
}: React.PropsWithChildren) {
  const [filters, setFilters] = useState<IFilters>({
    rarity: [],
    marketplace: [],
    token: "",
    amount: "",
    order: "amount_ASC",
  });

  const handleSetFilters = useCallback(
    (key: keyof IFilters, newFilters: any) => {
      setFilters((old) => ({
        ...old,
        [key]: newFilters,
      }));
    },
    []
  );

  const value = useMemo(
    () => ({
      filters,
      setFilters: handleSetFilters,
      setAllFilters: setFilters,
    }),
    [filters]
  );

  return (
    <RetailHousesFiltersContext.Provider value={value}>
      {children}
    </RetailHousesFiltersContext.Provider>
  );
}

export const useGetHousesFilters = () => useContext(RetailHousesFiltersContext);
