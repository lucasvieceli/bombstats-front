"use client";

export interface IFilters {
  rarity: string[];
  ability: string[];
  marketplace: string[];
  abilityHeroS: string[];
  strength: string;
  speed: string;
  stamina: string;
  token: string;
  amount: string;
  stake: string;
  stakeSen: string;
  order: string;
}

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface RetailHeroesFiltersContextValue {
  filters: IFilters;
  setFilters: (filter: keyof IFilters, newFilters: any) => void;
  setAllFilters: (filter: IFilters) => void;
}

const RetailHeroesFiltersContext = createContext(
  {} as RetailHeroesFiltersContextValue
);

export function RetailHeroesFiltersContextProvider({
  children,
}: React.PropsWithChildren) {
  const [filters, setFilters] = useState<IFilters>({
    rarity: [],
    ability: [],
    marketplace: [],
    abilityHeroS: [],
    strength: "",
    speed: "",
    stamina: "",
    token: "",
    amount: "",
    stake: "",
    stakeSen: "",
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
    <RetailHeroesFiltersContext.Provider value={value}>
      {children}
    </RetailHeroesFiltersContext.Provider>
  );
}

export const useGetHeroesFilters = () => useContext(RetailHeroesFiltersContext);
