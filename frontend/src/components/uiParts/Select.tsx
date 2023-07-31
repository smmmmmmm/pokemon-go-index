import React, { useEffect, useState } from "react";

import { Select as ChakraReactSelect } from "chakra-react-select";

interface SelectProps<T> {
  options: T[];
  value?: T;
  getLabel?: (v: T) => string;
  onChange?: (v: T) => void;
}

export const Select = <T,>(props: SelectProps<T>) => {
  const { options, value, getLabel, onChange } = props;

  // Next.js で DOM を使う時は client 側でのみ実行するようにする
  // ref: https://zenn.dev/inaniwaudon/articles/9cc5fcd5a08530
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const getLabel_ = (v?: T) => {
    if (v !== undefined) {
      if (getLabel) {
        return getLabel(v);
      } else {
        return v as string;
      }
    } else {
      return "";
    }
  };

  return (
    isClient && (
      <ChakraReactSelect
        value={{ value: value, label: getLabel_(value) }}
        onChange={(v) => {
          if (onChange && v && v.value !== undefined) {
            onChange(v.value);
          }
        }}
        options={options.map((option) => ({
          value: option,
          label: getLabel_(option),
        }))}
        size={"sm"}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    )
  );
};

interface GroupedSelectProps<T> {
  groupedOptions: { label: string; values: T[] }[];
  value?: T;
  getLabel?: (v: T) => string;
  onChange?: (v: T) => void;
}

export const GroupedSelect = <T,>(props: GroupedSelectProps<T>) => {
  const { groupedOptions, value, getLabel, onChange } = props;

  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const getLabel_ = (v?: T) => {
    if (v && getLabel) {
      return getLabel(v);
    } else {
      return "";
    }
  };

  return (
    isClient && (
      <ChakraReactSelect
        value={{ value: value, label: getLabel_(value) }}
        onChange={(v) => {
          if (onChange && v && v.value) {
            onChange(v.value);
          }
        }}
        options={groupedOptions.map((groupedOption) => ({
          label: groupedOption.label,
          options: groupedOption.values.map((option) => ({
            value: option,
            label: getLabel_(option),
          })),
        }))}
        size={"sm"}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    )
  );
};
