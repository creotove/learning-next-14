import type { Metadata } from 'next';
import getAllUsers from '../../../lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Users",
}
export default async function Users() {
    // const userData: Promise<User[]> = 
    const usersData : Promise<User[]> = getAllUsers()
    const users = await usersData


    const content = (
        users &&
        users.map((user, idx) => (
            <div className='flex mt-1 border-b-neutral-100' key={user.id}>
                <p className='me-3 w-6'>{user.id} </p>
                <Link href={`users/${user.id}`}>
                    <p className=''>{user.name}</p>
                </Link>
            </div>
        ))
    )
    return content
}
