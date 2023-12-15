import { v4 as uuidv4 } from "uuid";

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some(
            (user) => user.email == args.data.email
        );
        if (emailTaken) throw new Error("Email taken.");

        const user = {
            id: uuidv4(),
            ...args.data,
        };

        db.users.push(user);
        return user;
    },
    deleteUser(parent, args, { db }, info) {
        const userIndex = db.users.findIndex((user) => user.id == args.id);
        if (userIndex === -1) throw new Error("User not found.");

        const deletedUsers = db.users.slice(userIndex, 1);

        db.posts = db.posts.filter((post) => {
            const match = post.author == args.id;

            if (match) {
                db.comments = db.comments.filter(
                    (comment) => comment.post != post.id
                );
            }

            return !match;
        });

        return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
        const userExists = db.users.find((user) => user.id == args.data.author);
        if (!userExists) throw new Error("User not found.");
        const post = {
            id: uuidv4(),
            ...args.data,
        };
        db.posts.push(post);
        return post;
    },
    deletePost(parent, args, { db }, info) {
        const postIndex = db.posts.findIndex((post) => post.id == args.id);
        if (postIndex === -1) throw new Error("Post not found.");

        const postDeleteds = db.posts.splice(postIndex, 1);

        db.comments = db.comments.filter((comment) => comment.post != args.id);

        return postDeleteds[0];
    },
    createComment(parent, args, { db }, info) {
        const userExists = db.users.find((user) => user.id == args.author);
        if (!userExists) throw new Error("User not found.");

        const postExists = db.posts.find(
            (post) => post.id == args.data.post && post.published
        );
        if (!postExists) throw new Error("Post not found.");

        const comment = {
            id: uuidv4(),
            ...args.data,
        };

        db.comments.push(comment);
        return comment;
    },
    deleteComment(parent, args, { db }, info) {
        const commentIndex = db.comments.findIndex(
            (comment) => comment.id == args.id
        );
        if (!commentIndex) throw new Error("Comment not found.");

        const deletedComments = db.comments.splice(commentIndex, 1);

        return deletedComments[0];
    },
};

export { Mutation as default };
