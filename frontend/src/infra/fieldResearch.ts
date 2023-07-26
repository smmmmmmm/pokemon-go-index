import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";

import {
  FieldResearch,
  FieldResearchAdd,
  FieldResearchFromFirestore,
  FieldResearchGroup,
  FieldResearchGroupAdd,
  FieldResearchGroupFromFirestore,
  FieldResearchGroupUpdate,
  FieldResearchUpdate,
} from "@/features/fieldResearch";
import { db } from "@/infra/firebase";

/*
  document ref
*/

const fieldResearchGroupCollection = () => {
  return collection(db, "fieldResearchGroups");
};
const fieldResearchGroupDocument = (frgId: string) => {
  return doc(db, "fieldResearchGroups", frgId);
};
const fieldResearchCollection = (frgId: string) => {
  return collection(db, "fieldResearchGroups", frgId, "fieldResearches");
};
const fieldResearchDocument = (frgId: string, frId: string) => {
  return doc(db, "fieldResearchGroups", frgId, "fieldResearches", frId);
};

/*
  persistance
*/

// FieldResearchGroup
export const createFieldResearchGroup = async (
  frgAdd: FieldResearchGroupAdd
): Promise<void> => {
  await addDoc(fieldResearchGroupCollection(), frgAdd);
};

export const fetchFieldResearchGroups = async (): Promise<
  FieldResearchGroup[]
> => {
  const query = await getDocs(fieldResearchGroupCollection());
  return await Promise.all(
    query.docs.map(async (doc) => FieldResearchGroupFromFirestore(doc))
  );
};

export const updateFieldResearchGroup = async (
  frg: FieldResearchGroup,
  frgUpd: FieldResearchGroupUpdate
): Promise<void> => {
  await updateDoc(fieldResearchGroupDocument(frg.fieldResearchGroupId), frgUpd);
};

export const deleteFieldResearchGroup = async (
  frg: FieldResearchGroup
): Promise<void> => {
  await deleteDoc(fieldResearchGroupDocument(frg.fieldResearchGroupId));
};

// FieldResearch
export const addFieldResearch = async (
  frg: FieldResearchGroup,
  frAdd: FieldResearchAdd
): Promise<void> => {
  await addDoc(fieldResearchCollection(frg.fieldResearchGroupId), frAdd);
};

export const fetchFieldResearches = async (
  frgId: string
): Promise<FieldResearch[]> => {
  const query = await getDocs(fieldResearchCollection(frgId));
  return await Promise.all(
    query.docs.map(async (doc) => FieldResearchFromFirestore(doc))
  );
};
export const updateFieldResearch = async (
  frg: FieldResearchGroup,
  fr: FieldResearch,
  frUpd: FieldResearchUpdate
): Promise<void> => {
  await updateDoc(
    fieldResearchDocument(frg.fieldResearchGroupId, fr.fieldResearchId),
    frUpd
  );
};

export const deleteFieldResearch = async (
  frg: FieldResearchGroup,
  fr: FieldResearch
): Promise<void> => {
  await deleteDoc(
    fieldResearchDocument(frg.fieldResearchGroupId, fr.fieldResearchId)
  );
};
