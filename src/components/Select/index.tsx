"use client";

import Portal from "@/components/Portal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
export enum SelectCollapseColor {
  PRIMARY = "bg-primary",
  SECONDARY = "bg-secondary",
}
interface BaseProps {
  options: {
    value: string;
    render: React.ReactNode;
  }[];
  placeholder: string;
  allOptions?: boolean;
  color?: SelectCollapseColor;
  classNameRoot?: string;
}

interface SingleSelectProps extends BaseProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

interface MultiSelectProps extends BaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

type Props = SingleSelectProps | MultiSelectProps;

function Select({
  options,
  value: valueProps,
  placeholder,
  onChange,
  allOptions,
  multiple = false,
  color = SelectCollapseColor.SECONDARY,
  classNameRoot,
}: Props) {
  const t = useTranslations("component.select");
  const [value, setValue] = useState(valueProps);
  const [isOpen, setIsOpen] = useState<undefined | { x: number; y: number }>(
    undefined
  );
  const refRoot = useRef<HTMLDivElement>(null);
  const refButton = useRef<HTMLDivElement>(null);
  const refItems = useRef(null);

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  useOutsideClick([refButton, refItems], () => {
    setIsOpen(undefined);
  });

  const onClickRoot = () => {
    if (!refButton.current) return;

    setIsOpen((old) => {
      if (!refButton.current) return undefined;

      if (old) {
        return undefined;
      }
      return {
        x: refButton.current?.getBoundingClientRect().x,
        y:
          refButton.current.getBoundingClientRect().y +
          refButton.current.getBoundingClientRect().height +
          10,
      };
    });
  };

  const onClickItem = (selectedValue: string) => {
    setValue((oldValue) => {
      if (selectedValue === "") {
        onChange?.(selectedValue as any);
        setIsOpen(undefined);
        return selectedValue;
      }

      if (multiple) {
        const newValue = Array.isArray(oldValue)
          ? [...oldValue]
          : ([] as string[]);

        const index = newValue.indexOf(selectedValue);
        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(selectedValue);
        }
        onChange?.(newValue as any);
        return newValue;
      } else {
        onChange?.(selectedValue as any);
        return selectedValue;
      }
    });
    if (!multiple) {
      setIsOpen(undefined);
    }
  };

  const render = multiple
    ? renderMultiple()
    : options.find((option) => option.value === value)?.render ?? (
        <div className="text-gray-400">{placeholder}</div>
      );

  function renderMultiple() {
    if (!value || value.length === 0 || !value[0]) {
      return <div className="text-gray-400">{placeholder}</div>;
    } else if (value?.length > 1) {
      return <div className="text-gray-400">{value.length} selecteds</div>;
    } else {
      return options.find((option) => option.value === value[0])?.render;
    }
  }

  const isSelected = (selectedValue: string) => {
    if (multiple) {
      return value?.includes(selectedValue);
    } else {
      return value === selectedValue;
    }
  };

  return (
    <div ref={refRoot} className="relative">
      <div
        className={`${color} rounded-3xl overflow-hidden ${classNameRoot}`}
        onClick={onClickRoot}
        ref={refButton}
      >
        <div className="px-5 flex flex-row items-center h-14 gap-2.5 hover:bg-secondaryHover cursor-pointer">
          <div className="w-full">{render}</div>
          <motion.div
            initial={{ rotate: 0 }}
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 8.625L12 15.375L18.75 8.625"
                stroke="white"
                strokeWidth="1.125"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refItems}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                top: isOpen.y as unknown as number,
                left: isOpen.x as unknown as number,
              }}
              className="z-[150] absolute "
            >
              <div
                className={`${color}  shadow-xl flex flex-col py-2 rounded-3xl overflow-hidden`}
              >
                {allOptions && (
                  <div
                    className={classNames(
                      "flex flex-row items-center px-4 py-3 hover:bg-secondaryHover cursor-pointer",
                      {
                        "bg-selected":
                          value === "" || value === undefined || value === null,
                      }
                    )}
                    onClick={() => onClickItem("")}
                  >
                    {t("all")}
                  </div>
                )}
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex flex-row items-center px-4 py-3 hover:bg-secondaryHover cursor-pointer",
                      {
                        "bg-selected": isSelected(option.value),
                      }
                    )}
                    onClick={() => onClickItem(option.value)}
                  >
                    {option.render}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}

export default Select;
