import { busstopData } from "~/types"
import useSWRImmutable from "swr/immutable"
import { QuerySnapshot } from "firebase-admin/firestore"
import { converter } from "~/features/backend/converter"
import { adminDB } from "~/libs/firebase-admin"

export const useBusstop = () => {
  const { data } = useSWRImmutable("busstop" , async () => {
    const snapshot: QuerySnapshot<busstopData> = await adminDB
      .collection("Busstop")
      .withConverter(converter<busstopData>())
      .get()
    console.log("run")
    return snapshot.docs.map((snap) => snap.data())
  })

  return [data] as const
}