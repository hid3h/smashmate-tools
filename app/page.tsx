import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>あいうえいかいくけこ</p>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  )
}
