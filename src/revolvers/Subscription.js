const Subscription = {
    post: {
        subscribe(parent, args, { db, pubSub }, info) {
            return pubSub.asyncIterator("post");
        },
    },
    comment: {
        subscribe(parent, { postId }, { db, pubSub }, info) {
            const post = db.posts.find(
                (post) => post.id === postId && post.published
            );

            if (!post) throw new Error("Post not found.");

            return pubSub.asyncIterator(`comment ${postId}`);
        },
    },
};

export { Subscription as default };
