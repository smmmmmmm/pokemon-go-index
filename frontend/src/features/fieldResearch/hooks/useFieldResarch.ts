import { useEffect, useMemo, useState } from "react";

import {
  FieldResearch,
  FieldResearchGroup,
  FieldResearchType,
  useFetchFieldResearchGroups,
  useFetchFieldResearches,
} from "@/features/fieldResearch";

export const useFieldResearch = () => {
  // Field Research Groups
  const { allFieldResearchGroups, allFieldResearchGroupsIsLoading } =
    useFetchFieldResearchGroups();
  const [selectFieldResearchGroup, setSelectFieldResearchGroup] =
    useState<FieldResearchGroup>();

  // Field Researches
  const { fieldResearches, fieldResearchesIsLoading } = useFetchFieldResearches(
    selectFieldResearchGroup
  );
  const [selectFieldResearch, setSelectFieldResearch] =
    useState<FieldResearch>();

  // Grouped FieldResearch Option
  const groupedFieldResearchOptions = useMemo(() => {
    if (fieldResearches) {
      const grouped = fieldResearches.reduce((map, cur) => {
        const list = map.get(cur.type);
        if (list) {
          list.push(cur);
        } else {
          map.set(cur.type, [cur]);
        }
        return map;
      }, new Map<FieldResearchType, FieldResearch[]>());

      const groupedOptions: { label: string; values: FieldResearch[] }[] = [];
      grouped.forEach((frs, frType) => {
        groupedOptions.push({
          label: frType,
          values: frs.sort((a, b) => a.title.localeCompare(b.title)),
        });
      });
      return groupedOptions;
    }
  }, [fieldResearches]);

  // Set `selectFieldResearchGroup` state when initial & updated
  useEffect(() => {
    if (allFieldResearchGroups && allFieldResearchGroups.length > 0) {
      let newFRG: FieldResearchGroup | undefined;
      if (!selectFieldResearchGroup) {
        // initial
        newFRG = allFieldResearchGroups.find((frg) => frg.title === "通常");
      } else {
        // updated
        newFRG = allFieldResearchGroups.find(
          (frg) =>
            frg.fieldResearchGroupId ===
            selectFieldResearchGroup.fieldResearchGroupId
        );
      }
      // 存在しない場合は先頭を選択
      setSelectFieldResearchGroup(newFRG ?? allFieldResearchGroups[0]);
    }
  }, [allFieldResearchGroups, selectFieldResearchGroup]);

  // Set `selectFieldResearch` state when initial & updated
  useEffect(() => {
    if (fieldResearches) {
      let newFR: FieldResearch | undefined;
      if (!selectFieldResearch) {
        // initial
        newFR = fieldResearches[0];
      } else {
        // updated
        newFR = fieldResearches.find(
          (fr) => fr.fieldResearchId === selectFieldResearch.fieldResearchId
        );
      }
      // 存在しない場合は先頭を選択
      setSelectFieldResearch(newFR ?? fieldResearches[0]);
    }
  }, [fieldResearches, selectFieldResearch]);

  return {
    // Field Research Group
    allFieldResearchGroups,
    allFieldResearchGroupsIsLoading,
    selectFieldResearchGroup,
    setSelectFieldResearchGroup,
    // Field Research
    groupedFieldResearchOptions,
    selectFieldResearch,
    setSelectFieldResearch,
  };
};
