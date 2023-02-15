import { QuerySnapshot } from 'firebase-admin/firestore'
import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import { converter } from '~/features/backend/converter'
import { useBusstop } from '~/hooks/useBusstop'
import { adminDB } from '~/libs/firebase-admin'
import { busstopData, busstop } from '~/types'
import useSWRImmutable from "swr/immutable"

type Props = {
  busstopData: busstop[][]
} 

const Home: NextPage<Props> = ({ busstopData }) => {
  // const fetcher = (url: string) => busstopData
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data }: {data:busstop[][]} = useSWRImmutable("api/busstop", fetcher)
  const [count, setCount] = useState<number>(0)
  console.log(data)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {count}
      {data ? data.map((route) => route.map((value, index) => ((
        <p key={index}>{value.name}</p>
      )))):null}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const snapshot: QuerySnapshot<busstopData> = await adminDB
    .collection("Busstop")
    .withConverter(converter<busstopData>())
    .get()
  const data: busstop[][] = snapshot.docs.map((snap) => snap.data().route)
  return {
    props: {
      busstopData: data
    }
  }
}