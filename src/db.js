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

const db = { users, posts, comments };

export { db as default };
