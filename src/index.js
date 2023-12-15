import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";

import Query from "./revolvers/Query";
import Mutation from "./revolvers/Mutation";
import Subscription from "./revolvers/Subscription";
import User from "./revolvers/User";
import Post from "./revolvers/Post";
import Comment from "./revolvers/Comment";

const pubSub = new PubSub();

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment,
    },
    context: {
        db,
        pubSub,
    },
});

server.start(() => {
    console.log("server is up");
});
