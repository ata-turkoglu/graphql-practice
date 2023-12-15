import { GraphQLServer } from "graphql-yoga";
import db from "./db";

import Query from "./revolvers/Query";
import Mutation from "./revolvers/Mutation";
import User from "./revolvers/User";
import Post from "./revolvers/Post";
import Comment from "./revolvers/Comment";

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment,
    },
    context: {
        db,
    },
});

server.start(() => {
    console.log("server is up");
});
