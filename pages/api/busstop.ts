import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDB } from '~/libs/firebase-admin'
import { converter } from '~/features/backend/converter'
import { QuerySnapshot } from 'firebase-admin/firestore'
import { busstopData, busstop } from '~/types'

const handler = async ( req: NextApiRequest, res: NextApiResponse<busstop[][]> ) => {
  if (req.method === 'GET') {
    const snapshot: QuerySnapshot<busstopData> = await adminDB
      .collection("Busstop")
      .withConverter(converter<busstopData>())
      .get()
    const data: busstop[][] = snapshot.docs.map((snap) => snap.data().route)
    res.json(data)
    // console.log(data)
  }
}

export default handler