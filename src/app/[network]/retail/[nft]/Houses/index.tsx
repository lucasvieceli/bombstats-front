"use client";

import { useGetHousesFilters } from "@/app/[network]/retail/[nft]/hooks/useGetHousesFilters";
import { House as HouseEntity } from "@/application/entities/house";
import { WalletNetwork } from "@/application/entities/wallet";
import { getRetailHouses } from "@/application/use-cases/getRetailHouses";
import AnimatedCounter from "@/components/AniomatedCounter";
import Card, { CardContent } from "@/components/Card";
import House from "@/components/House";
import HouseSkeleton from "@/components/House/Skeleton";
import { useEffectExceptOnMount } from "@/hooks/useEffectExceptOnMount";
import { IPaginate, IPaginateOrderBy } from "@/util/paginate";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

function Houses() {
  const t = useTranslations("market.houses");
  const { filters } = useGetHousesFilters();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<IPaginate<HouseEntity>>();
  const params = useParams();
  const page = useRef<undefined | number>(undefined);

  const qtyFilters = Object.keys(filters)
    .filter((v) => v !== "token" && v !== "order")
    .filter((key) => (filters as any)[key].length > 0).length;

  function reset() {
    page.current = 0;
    setError(false);
    setData(undefined);
  }

  useEffectExceptOnMount(() => {
    reset();
  }, [filters]);

  useEffect(() => {
    if (page.current !== undefined) return;
    console.log("aki");
    page.current = 0;
    fetchNextPage(false);
  }, []);

  async function fetchNextPage(checkIsLoading = true) {
    if ((checkIsLoading && isLoading) || error || qtyFilters == 0) return;

    if (page.current !== undefined) {
      page.current++;
    }
    setIsLoading(true);

    try {
      const { order, ...restFilters } = filters;
      const orderSplit = order.split("_");
      const result = await getRetailHouses({
        network: params.network as WalletNetwork,
        params: {
          page: page.current as number,
          ...restFilters,
          orderBy: orderSplit[0],
          order: orderSplit[1] as IPaginateOrderBy,
        },
      });

      if (!data) {
        setData(result);
      } else {
        setData((old) => {
          if (!old) return data;

          return {
            ...old,
            items: [...old.items, ...result.items],
          };
        });
      }
    } catch {
      setError(true);
    }

    setIsLoading(false);
  }

  function getContent() {
    if (qtyFilters == 0 && !isLoading) {
      return (
        <Card>
          <CardContent>
            <div className="text-18">{t("selectOneFilter")}</div>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card>
          <CardContent>
            <div className="text-18">{t("fetchingError")}</div>
          </CardContent>
        </Card>
      );
    }

    if (data && data?.items?.length == 0 && !isLoading) {
      return (
        <Card>
          <CardContent>
            <div className="text-18">{t("noHousesFound")}</div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-4 grid-cols-1">
        {data &&
          data?.items?.length > 0 &&
          data?.items.map((house) => (
            <House key={house.id} data={house} className="!flex-1" />
          ))}
      </div>
    );
  }

  const hasNextPage = !data || data?.meta?.totalItems > data?.items?.length;
  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-22 font-extrabold flex">
        {t("houses")} (
        <AnimatedCounter from={0} to={data?.meta.totalItems || 0} />)
      </h1>
      {error ? (
        <Card>
          <CardContent>
            <div className="text-18">{t("fetchingError")}</div>
          </CardContent>
        </Card>
      ) : (
        <InfiniteScroll
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          useWindow
          loader={
            isLoading ? (
              <div className="mt-4 flex flex-col">
                <HouseSkeleton />
                <HouseSkeleton />
                <HouseSkeleton />
                <HouseSkeleton />
              </div>
            ) : undefined
          }
        >
          {getContent()}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Houses;
