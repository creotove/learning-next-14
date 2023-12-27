import Link from 'next/link';
export default function UserLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <section className='px-24'>
            <h2 className='text-2xl'>
                <Link className='border-b' href='/'>Home</Link>
            </h2>
            {children}
        </section>
    )
}
