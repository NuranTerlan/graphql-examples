const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// initialize a graphql schema
const schema = buildSchema(`
    type Query {
        foo: String,
    }
`);

// root resolver
const root = { foo: () => "Express GraphQL Server" };

const app = express();
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		rootValue: root,
	})
);

app.listen(4000, () =>
	console.log("Graphql is running on http://localhost:4000/graphql")
);
