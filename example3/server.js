const { ApolloServer, gql } = require("apollo-server");

const posts = [
	{
		id: 1,
		title: "Post 1",
		author_id: 1,
	},
	{
		id: 2,
		title: "Post 2",
		author_id: 2,
	},
	{
		id: 3,
		title: "Post 3",
		author_id: 1,
	},
];

const authors = [
	{
		id: 1,
		name: "Nuran",
	},
	{
		id: 2,
		name: "Orxan",
	},
];

const schema = gql`
	type Query {
		posts: [Post]
		authors: [Author]
	}

	type Post {
		id: Int
		title: String
		author: Author
	}

	type Author {
		id: Int
		name: String
	}

	type Mutation {
		createPost(id: Int, title: String, author_id: Int): Post
	}
`;

// root resolver
const rootResolver = {
	Query: {
		posts() {
			return posts;
		},
		authors() {
			return authors;
		},
	},
	Post: {
		author(post) {
			return authors.find((a) => a.id === post.author_id);
		},
	},
	Mutation: {
		createPost: (_, args) => {
			let newPost = {
				id: args.id,
				title: args.title,
				author_id: args.author_id,
			};
			posts.push(newPost);
			return newPost;
		},
	},
};

// apollo server
const server = new ApolloServer({
	typeDefs: schema,
	resolvers: rootResolver,
});

server
	.listen({ port: 4000 })
	.then(({ url }) => console.log(`Server ready on ${url}`));
