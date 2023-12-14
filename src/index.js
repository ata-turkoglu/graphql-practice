import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

const users = [
    {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
        age: 37,
    },
    {
        id: "2",
        name: "Andy Cole",
        email: "andycole@example.com",
        age: 45,
    },
    {
        id: "3",
        name: "Sarah Wood",
        email: "sarahwood@example.com",
    },
];

const posts = [
    {
        id: "10",
        title: "GraphQL 101",
        body: "This is how to use GraphQL...",
        published: true,
        author: "1",
    },
    {
        id: "11",
        title: "GraphQL 201",
        body: "This is an advanced GraphQL post...",
        published: true,
        author: "1",
    },
    {
        id: "12",
        title: "Programming Music",
        body: "",
        published: true,
        author: "2",
    },
];

const comments = [
    {
        id: "102",
        text: "This is amazing!",
        author: "3",
        post: "10",
    },
    {
        id: "103",
        text: "Glad you enjoyed it.",
        author: "2",
        post: "12",
    },
    {
        id: "104",
        text: "Nevermind. I got it to work.",
        author: "2",
        post: "12",
    },
    {
        id: "105",
        text: "This did no work.",
        author: "3",
        post: "11",
    },
    {
        id: "106",
        text: "Maybe tomorrow.",
        author: "1",
        post: "10",
    },
    {
        id: "107",
        text: "Go on.",
        author: "1",
        post: "11",
    },
];

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser (data: createUserInput!): User!
        createPost (data: createPostInput!): Post!
        createComment (data: createCommentInput!): Comment!
    }

    input createUserInput{
        name: String!
        email: String!
        age: Int
    }

    input createPostInput{
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input createCommentInput{
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

const resolvers = {
    Query: {
        users(parent, args, context, info) {
            if (!args.query) {
                return users;
            }

            return users.filter((user) =>
                user.name.toLowerCase().includes(args.query.toLowerCase())
            );
        },
        posts(parent, args, context, info) {
            if (!args.query) {
                return posts;
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title
                    .toLowerCase()
                    .includes(args.query.toLowerCase());
                const isBodyMatch = post.body
                    .toLowerCase()
                    .includes(args.query.toLowerCase());
                return isTitleMatch || isBodyMatch;
            });
        },
        comments(parent, args, context, info) {
            return comments;
        },
    },
    Mutation: {
        createUser(parent, args, context, info) {
            const emailTaken = users.some(
                (user) => user.email == args.data.email
            );
            if (emailTaken) throw new Error("Email taken.");

            const user = {
                id: uuidv4(),
                ...args.data,
            };
            console.log("user", user);
            users.push(user);
            return user;
        },
        createPost(parent, args, context, info) {
            const userExists = users.find(
                (user) => user.id == args.data.author
            );
            if (!userExists) throw new Error("User not found.");
            const post = {
                id: uuidv4(),
                ...args.data,
            };
            posts.push(post);
            return post;
        },
        createComment(parent, args, context, info) {
            const userExists = users.find((user) => user.id == args.author);
            if (!userExists) throw new Error("User not found.");

            const postExists = posts.find(
                (post) => post.id == args.data.post && post.published
            );
            if (!postExists) throw new Error("Post not found.");

            const comment = {
                id: uuidv4(),
                ...args.data,
            };

            comments.push(comment);
            return comment;
        },
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id == parent.author);
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post == parent.id);
        },
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author == parent.id);
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author == parent.id);
        },
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id == parent.author);
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id == parent.post);
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

server.start(() => {
    console.log("server is up");
});
