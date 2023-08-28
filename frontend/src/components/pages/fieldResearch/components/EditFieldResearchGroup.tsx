import React, { Dispatch, FC, useEffect, useState } from "react";

import { Center, HStack, Heading, Input, Text, VStack } from "@chakra-ui/react";

import { EditModal } from "@/components/uiParts/EditModal";
import {
  FieldResearchGroup,
  FieldResearchGroupAdd,
  useAddFieldResearchGroup,
  useDeleteFieldResearchGroup,
  useUpdateFieldResearchGroup,
} from "@/features/fieldResearch";

const FieldResearchGroupInputModal: FC<{
  frgAdd: FieldResearchGroupAdd;
  setFRGAdd: Dispatch<FieldResearchGroupAdd>;
}> = (props) => {
  const { frgAdd, setFRGAdd } = props;

  return (
    <VStack align="stretch" p="10px" spacing={3}>
      <Heading as="h3" fontWeight={600} size="md">
        詳細
      </Heading>
      <HStack w={"95%"}>
        <Heading as="h4" w={"20%"} fontWeight={100} size="sm">
          名称
        </Heading>
        <Input
          onChange={(e) => setFRGAdd({ ...frgAdd, title: e.target.value })}
          value={frgAdd.title}
        />
      </HStack>
    </VStack>
  );
};

export const AddFieldResearchGroup: FC = () => {
  const [frgAdd, setFRGAdd] = useState<FieldResearchGroupAdd>({
    title: "",
  });
  const { mutate } = useAddFieldResearchGroup();

  return (
    <EditModal
      type="create"
      submit={() => {
        mutate(frgAdd);
      }}
    >
      <FieldResearchGroupInputModal frgAdd={frgAdd} setFRGAdd={setFRGAdd} />
    </EditModal>
  );
};

export const UpdateFieldResearchGroup: FC<{
  frg: FieldResearchGroup;
}> = (props) => {
  const { frg } = props;

  const [frgUpdate, setFRGUpdate] = useState<FieldResearchGroupAdd>(frg);
  const { mutate } = useUpdateFieldResearchGroup(frg);

  useEffect(() => {
    setFRGUpdate(frg);
  }, [frg]);

  return (
    <EditModal
      type="update"
      submit={() => {
        mutate(frgUpdate);
      }}
    >
      <FieldResearchGroupInputModal
        frgAdd={frgUpdate}
        setFRGAdd={setFRGUpdate}
      />
    </EditModal>
  );
};

export const DeleteFieldResearchGroup: FC<{
  frg: FieldResearchGroup;
}> = (props) => {
  const { frg } = props;
  const { mutate } = useDeleteFieldResearchGroup(frg);
  return (
    <EditModal type="delete" submit={mutate}>
      <Center p={5}>
        <Text fontWeight={900}> {`" ${frg.title} "`} </Text> を削除します
      </Center>
    </EditModal>
  );
};
