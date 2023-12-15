const Subscription = {
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
