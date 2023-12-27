import type { Metadata } from 'next';
import getUser from '../../../../lib/getUser';
import getUserPosts from '../../../../lib/getUserPosts';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';

export const metadata: Metadata = {
    title: "Users",
}
export default async function Users({ params }: {
    params: {
        userId: string
    }
}) {

    const userData: Promise<User> = getUser(params.userId)
    const postsData: Promise<Post[]> = getUserPosts(params.userId)

    // const [user, userPosts] = await Promise.all([userData, postsData]) 
    // above we are using the water fall model approach that is if all the data is fetched
    // then only render the data.
    // This approach is a valid approach when we want to display all the fetched data at Once.

    const user = await userData
    // const userPosts = await postsData
    const userPosts = postsData.then((res) => (res)) // I dunno about this ts was giving the error about the then | catch | finally not implement so done this
    // Using the above approach increase the user Exp. because instead of waterfall all steps are carried out and
    // presented(just a terminology got from software engineering subject) this approach will load the user data 
    // first then if the posts request is not fulfilled yet then due to suspense the loading text will be displayed

    const content = (
        <>
            <h2 className='text-xl mb-3 text-center'>
                {user.name} Posts
            </h2>
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPosts} />
            </Suspense>
        </>
    )
    return content
}
