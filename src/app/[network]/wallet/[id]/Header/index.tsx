"use client";

import Header from "@/components/Header";
import SearchInput from "@/components/InputSearch";
import SearchInputMobile from "@/components/InputSearchMobile";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

function HeaderWallet() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("searchWallet");

  function onSubmitSearch(value: string) {
    router.push(`/${params.network}/wallet/${value}`);
  }
  return (
    <Header>
      <div className="hidden max-w-[526px] w-full flex-col md:flex">
        <SearchInput placeholder={t("title")} onSubmitSearch={onSubmitSearch} />
      </div>
      <div className="flex flex-1 md:hidden">
        <SearchInputMobile
          placeholder={t("title")}
          onSubmitSearch={onSubmitSearch}
        />
      </div>
    </Header>
  );
}

export default HeaderWallet;
