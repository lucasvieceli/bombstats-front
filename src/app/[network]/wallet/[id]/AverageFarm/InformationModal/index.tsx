"use client";

import { IGetWalletResponse } from "@/application/use-cases/getWallet";
import Modal from "@/components/Modal";
import ModalPortal from "@/components/Modal-portal";
import Close from "@/components/icons/Close";
import Information from "@/components/icons/Information";
import { getFormatDateOptions } from "@/util/date";
import { getNumberFormatOptions } from "@/util/number";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

interface InformationModalProps {
  data: IGetWalletResponse;
}

function InformationModal({ data }: InformationModalProps) {
  const t = useTranslations("searchWallet.detail.informationModal");
  const f = useFormatter();

  const [isOpen, setIsOpen] = useState(false);
  if (!data?.wallet?.farmAverage) return null;

  return (
    <>
      <Information
        className="w-6 h-6 fill-green-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <ModalPortal>
        {isOpen && (
          <Modal
            onClose={() => setIsOpen(false)}
            className="md:!max-w-[600px] md:!w-auto !h-auto p-4 !bg-secondary shadow-xl gap-6 flex flex-col"
          >
            <div className="flex flex-row justify-between flex-1 text-18">
              <div>{t("title")}</div>
              <Close
                className="w-6 h-6 fill-gray cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="font-semibold text-16">{t("description")}</div>
            <div className="flex flex-col flex-wrap gap-4 items-start">
              <div className="flex flex-col  rounded-md">
                <div className="text-12 text-[#D8C9C9]">{t("startDate")}</div>
                <div>
                  {f.dateTime(
                    new Date(data.wallet?.farmAverage?.startDate),
                    getFormatDateOptions()
                  )}
                </div>
              </div>

              <div className="flex flex-col  rounded-md">
                <div className="text-12 text-[#D8C9C9]">{t("endDate")}</div>
                <div>
                  {f.dateTime(
                    new Date(data.wallet?.farmAverage?.endDate),
                    getFormatDateOptions()
                  )}
                </div>
              </div>
              <div className="flex flex-col  rounded-md">
                <div className="text-12 text-[#D8C9C9]">{t("totalHours")}</div>
                <div>
                  {f.number(
                    data.wallet?.farmAverage?.totalHours,
                    getNumberFormatOptions(2)
                  )}
                </div>
              </div>
              <div className="flex flex-col  rounded-md">
                <div className="text-12 text-[#D8C9C9]">
                  {t("totalSeconds")}
                </div>
                <div>
                  {f.number(
                    data.wallet?.farmAverage?.totalSeconds,
                    getNumberFormatOptions(0)
                  )}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </ModalPortal>
    </>
  );
}

export default InformationModal;
