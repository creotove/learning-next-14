import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <h1 className='text-4xl'>
        Home Page
      </h1>
      <Link href='/users'>
        <p className='text-2xl'>
          Users
        </p>
      </Link>
    </main>
  )
}
