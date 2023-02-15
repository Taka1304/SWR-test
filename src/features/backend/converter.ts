import { QueryDocumentSnapshot } from "firebase-admin/firestore"

// withConverter(converter<TYPE>())で使う
export const converter = <T>() => ({
  // firestoreに送る時の型変換
  toFirestore: (data: T) => {
    return data;
  },
  // firestoreから受け取る時の型変換
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    return snapshot.data() as T;
  },
});
