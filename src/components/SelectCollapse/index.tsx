"use client";

import classNames from "classnames";
import { on } from "events";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
  isOpen?: boolean;
  onOpen?: () => void;
}

interface SingleSelectCollapseProps extends BaseProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

interface MultiSelectCollapseProps extends BaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

type Props = SingleSelectCollapseProps | MultiSelectCollapseProps;

function SelectCollapse({
  options,
  value: valueProps,
  placeholder,
  onChange,
  allOptions,
  multiple = false,
  color = SelectCollapseColor.SECONDARY,
  isOpen: isOpenProps = false,
  onOpen,
}: Props) {
  const [value, setValue] = useState(valueProps);
  const [isOpen, setIsOpen] = useState<boolean>(isOpenProps);
  const t = useTranslations("component.selectCollapse");

  useEffect(() => {
    setValue(valueProps);
  }, [valueProps]);

  useEffect(() => {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);

  const onClickItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    SelectCollapseValue: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setValue((oldValue) => {
      if (SelectCollapseValue === "") {
        onChange?.(SelectCollapseValue as any);
        return SelectCollapseValue;
      }

      if (multiple) {
        const newValue = Array.isArray(oldValue)
          ? [...oldValue]
          : ([] as string[]);

        const index = newValue.indexOf(SelectCollapseValue);
        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(SelectCollapseValue);
        }
        onChange?.(newValue as any);
        return newValue;
      } else {
        onChange?.(SelectCollapseValue as any);
        setIsOpen(false);
        return SelectCollapseValue;
      }
    });
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

  const isSelectCollapse = (SelectCollapseValue: string) => {
    if (multiple) {
      return value?.includes(SelectCollapseValue);
    } else {
      return value === SelectCollapseValue;
    }
  };

  function onClickRoot() {
    setIsOpen((old) => {
      const newValue = !old;

      if (newValue) {
        onOpen?.();
      }

      return newValue;
    });
  }

  return (
    <div
      className={`${color} rounded-3xl overflow-hidden shrink-0`}
      onClick={onClickRoot}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div
              className={`${color} shadow-xl flex flex-col pb-2  overflow-hidden`}
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
                  onClick={(event) => onClickItem(event, "")}
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
                      "bg-selected": isSelectCollapse(option.value),
                    }
                  )}
                  onClick={(event) => onClickItem(event, option.value)}
                >
                  {option.render}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SelectCollapse;
