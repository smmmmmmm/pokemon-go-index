import React, { Dispatch, FC, useEffect, useState } from "react";

import { Center, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";

import { PokemonSelectBox } from "@/components/projects/PokemonSelectBox";
import { EditModal } from "@/components/uiParts/EditModal";
import { Select } from "@/components/uiParts/Select";
import {
  FieldResearch,
  FieldResearchAdd,
  FieldResearchGroup,
  FieldResearchType,
  FieldResearchTypeChoices,
  useAddFieldResearch,
  useDeleteFieldResearch,
  useUpdateFieldResearch,
} from "@/features/fieldResearch";

const FieldResearchInputModal: FC<{
  fieldResearch: FieldResearchAdd;
  setFieldResearch: Dispatch<FieldResearchAdd>;
}> = (props) => {
  const { fieldResearch, setFieldResearch } = props;

  return (
    <VStack align="stretch" p="10px" spacing={3}>
      <Heading as="h3" size="md" fontWeight={600}>
        詳細
      </Heading>
      <HStack width={"95%"}>
        <Heading as="h4" size="sm" fontWeight={100} width={"20%"}>
          名称
        </Heading>
        <Input
          value={fieldResearch.title}
          onChange={(e) =>
            setFieldResearch({ ...fieldResearch, title: e.target.value })
          }
        />
      </HStack>
      <HStack width={"95%"}>
        <Heading as="h4" size="sm" fontWeight={100} width={"20%"}>
          種別
        </Heading>
        <Select<FieldResearchType>
          options={FieldResearchTypeChoices}
          value={fieldResearch.type}
          onChange={(v) => {
            setFieldResearch({ ...fieldResearch, type: v });
          }}
        />
      </HStack>
      <Heading as="h3" size="md" fontWeight={600}>
        獲得ポケモン
      </Heading>
      <PokemonSelectBox
        selectedPids={fieldResearch.getablePokemonIds}
        handleChange={(newPids: string[]) => {
          setFieldResearch({
            ...fieldResearch,
            getablePokemonIds: newPids,
          });
        }}
      />
    </VStack>
  );
};

export const AddFieldResearch: FC<{ frg: FieldResearchGroup }> = (props) => {
  const { frg } = props;

  const [frAdd, setFRAdd] = useState<FieldResearchAdd>({
    title: "",
    type: "歩く",
    getablePokemonIds: [],
  });
  const { mutate } = useAddFieldResearch(frg);

  return (
    <EditModal
      type="create"
      submit={() => {
        mutate(frAdd);
      }}
    >
      <FieldResearchInputModal
        fieldResearch={frAdd}
        setFieldResearch={setFRAdd}
      />
    </EditModal>
  );
};

export const UpdateFieldResearch: FC<{
  frg: FieldResearchGroup;
  fr: FieldResearch;
}> = (props) => {
  const { frg, fr } = props;

  const [frUpdate, setFRUpdate] = useState<FieldResearchAdd>(fr);
  const { mutate } = useUpdateFieldResearch(frg, fr);

  useEffect(() => {
    setFRUpdate(fr);
  }, [fr]);

  return (
    <EditModal
      type="update"
      submit={() => {
        mutate(frUpdate);
      }}
    >
      <FieldResearchInputModal
        fieldResearch={frUpdate}
        setFieldResearch={setFRUpdate}
      />
    </EditModal>
  );
};

export const DeleteFieldResearch: FC<{
  frg: FieldResearchGroup;
  fr: FieldResearch;
}> = (props) => {
  const { frg, fr } = props;
  const { mutate } = useDeleteFieldResearch(frg, fr);
  return (
    <EditModal type="delete" submit={mutate}>
      <Center p={5}>
        <Text fontWeight={900}> {`" ${fr.title} "`} </Text> を削除します
      </Center>
    </EditModal>
  );
};
