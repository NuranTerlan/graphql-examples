const { graphql, buildSchema } = require("graphql");

// initialize a graphql schema
const schema = buildSchema(`
    type Query {
        foo: String,
    }
`);

// root resolver
const root = { foo: () => "GraphQL Server" };

graphql(schema, "{foo}", root).then((res) => console.log(res));
