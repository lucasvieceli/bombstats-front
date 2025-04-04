"use client";

import { IFilter } from "@/app/[network]/investment-simulator/page";
import Button from "@/components/Button";
import Close from "@/components/icons/Close";
import Input, { InputColor } from "@/components/Input";
import Modal from "@/components/Modal";
import SelectCollapse, {
  SelectCollapseColor,
} from "@/components/SelectCollapse";
import {
  HERO_COLORS,
  HERO_MINIMUM_STAKE,
  HERO_RARITY_ARRAY,
} from "@/util/hero";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IAddRarityModal {
  onClose: () => void;
  heroes: IFilter["heroes"];
  onApply: (value: IFilter["heroes"][0]) => void;
}

function AddRarityModal({ onClose, onApply, heroes }: IAddRarityModal) {
  const tRarity = useTranslations("component.hero.rarity");
  const t = useTranslations("investmentSimulator.addRarityModal");
  const [menuOpen, setMenuOpen] = useState("");
  const [values, setValues] = useState<IFilter["heroes"][0]>(
    {} as IFilter["heroes"][0]
  );

  useEffect(() => {
    setValues((old) => ({
      ...old,
      stakeBcoin: HERO_MINIMUM_STAKE.bcoin[values.rarity],
      stakeSen: HERO_MINIMUM_STAKE.sens[values.rarity],
    }));
  }, [values.rarity]);

  function handleAdd() {
    if (!values.quantity) {
      alert(t("alertNoQuantity"));
      return;
    }

    if (heroes.find((hero) => hero.rarity === values.rarity)) {
      alert(t("alertRarityAdded"));
      return;
    }

    if (!values.stakeBcoin && !values.stakeSen) {
      alert(t("alertNoStake"));
      return;
    }

    if (
      (values.rarity as any) === "" ||
      values.rarity === undefined ||
      !values.quantity
    ) {
      alert(t("alertFillAllFields"));
      return;
    }

    onApply(values);
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      className="md:!max-w-[414px] w-full !h-auto p-4 !bg-secondary shadow-xl gap-6 flex flex-col overflow-y-auto"
    >
      <div className="flex flex-row justify-between text-white text-18 font-extrabold">
        <div>{t("addRarity")}</div>

        <Close className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>
      <SelectCollapse
        options={HERO_RARITY_ARRAY.map((name, i) => ({
          value: i.toString(),
          render: (
            <div className="flex flex-row gap-4 items-center">
              <div
                style={{ background: HERO_COLORS[i] }}
                className={`w-4 h-4 shrink-0 rounded-full`}
              />
              <div>{tRarity(name)}</div>
            </div>
          ),
        }))}
        placeholder={t("selectRarity")}
        onChange={(value) =>
          setValues((old) => ({ ...old, rarity: Number(value) }))
        }
        color={SelectCollapseColor.PRIMARY}
        isOpen={menuOpen === "rarity"}
        onOpen={() => setMenuOpen("rarity")}
      />
      <Input
        placeholder={t("quantityHeroes")}
        color={InputColor.PRIMARY}
        type="number"
        onChange={({ target: { value } }: any) =>
          setValues((old) => ({ ...old, quantity: value }))
        }
      />
      <Input
        iconLeft={
          <div className="relative w-6 h-6">
            <Image
              src="/images/bomb.webp"
              fill
              sizes="100px"
              className="object-contain object-center"
              alt="bcoin"
            />
          </div>
        }
        placeholder={t("minStakeBcoin")}
        color={InputColor.PRIMARY}
        value={values.stakeBcoin}
        type="number"
        onChange={({ target: { value } }: any) =>
          setValues((old) => ({ ...old, stakeBcoin: value }))
        }
      />
      <Input
        iconLeft={
          <div className="relative w-6 h-6">
            <Image
              src="/images/sen.webp"
              fill
              sizes="100px"
              className="object-contain object-center"
              alt="bcoin"
            />
          </div>
        }
        placeholder={t("minStakeSens")}
        color={InputColor.PRIMARY}
        value={values.stakeSen}
        type="number"
        onChange={({ target: { value } }: any) =>
          setValues((old) => ({ ...old, stakeSen: value }))
        }
      />
      <Button onClick={handleAdd}>{t("add")}</Button>
    </Modal>
  );
}

export default AddRarityModal;
