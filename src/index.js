import { GraphQLServer } from "graphql-yoga";

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

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id == parent.author);
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
