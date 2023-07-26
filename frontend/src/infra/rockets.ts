import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore/lite";

import {
  RocketMember,
  RocketMemberAdd,
  RocketMemberFromFirestore,
  RocketMemberUpdate,
} from "@/features/rockets";
import { db } from "@/infra/firebase";

/*
  document ref
*/

const rocketCollection = () => {
  return collection(db, "rockets");
};

const rocketDocument = (eventId: string) => {
  return doc(db, "rockets", eventId);
};

/*
  persistance
*/

export const createRocketMember = async (
  newr: RocketMemberAdd
): Promise<void> => {
  const rocketQuery = await getDocs(
    query(rocketCollection(), orderBy("index", "desc"), limit(1))
  );
  const data = await Promise.all(
    rocketQuery.docs.map(async (doc) => {
      return doc.data();
    })
  );

  await addDoc(rocketCollection(), { index: data[0].index + 1, ...newr });
};

export const fetchAllRockets = async (): Promise<RocketMember[]> => {
  const rocketQuery = await getDocs(
    query(rocketCollection(), orderBy("index"))
  );
  const data = await Promise.all(
    rocketQuery.docs.map(async (doc) => {
      return RocketMemberFromFirestore(doc);
    })
  );
  return data;
};

export const updateRocketMember = async (
  r: RocketMember,
  newr: RocketMemberUpdate
): Promise<void> => {
  await updateDoc(rocketDocument(r.rocketMemberId), newr);
};
