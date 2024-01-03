import React from "react";

import { Select } from "@chakra-ui/react";

export const RegionSelect: React.FC<{
  generation: number;
  handleChange: (val: number) => void;
}> = (props) => {
  const { generation, handleChange } = props;

  return (
    <Select
      id="select-region"
      onChange={(e) => handleChange(+e.target.value)}
      value={generation}
    >
      <option value={1}> カントー </option>
      <option value={2}> ジョウト </option>
      <option value={3}> ホウエン </option>
      <option value={4}> シンオウ </option>
      <option value={5}> イッシュ </option>
      <option value={6}> カロス </option>
      <option value={7}> アローラ </option>
      <option value={8}> ガラル </option>
      <option value={9}> ヒスイ&パルデア </option>
    </Select>
  );
};
