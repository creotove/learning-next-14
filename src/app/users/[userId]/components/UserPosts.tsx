type Props = {
    promise: Promise<Post[]>
}

export default async function UserPosts({ promise }: Props) {
    const posts = await promise

    const content = posts.map(post => {
        return (
            <article className="mb-3 border p-3 border-neutral-700 rounded" key={post.id}>
                <h2 className="text-2xl text-neutral-100">{post.title}</h2>
                <p className="text-neutral-400">{post.body}</p>
            </article>
        )
    })
    return content
}
