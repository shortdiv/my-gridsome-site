// const { ApolloServer, gql } = require("apollo-server-lambda");
// const { createHttpLink } = require("apollo-link-http");
// const { introspectSchema, makeRemoteExecutableSchema } = require('graphql-tools');
// const fetch = require("node-fetch")

// exports.handler = function(event, context, callback) {
//   if (!process.env.FAUNA_SERVER_SECRET) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ err: "Did you forget your fauna db secret token?" })
//     }
//   }
//   const base64Secret = Buffer.from(process.env.FAUNA_SERVER_SECRET).toString('base64')
//   const headers = { Authorization: `Basic ${base64Secret}`}
  
//   const link = createHttpLink({ uri: "https://graphql.fauna.com/graphql", fetch, headers })
//   introspectSchema(link).then(schema => {
//     const executableSchema = makeRemoteExecutableSchema({
//       schema,
//       link
//     });
//     const server = new ApolloServer({
//       schema: executableSchema
//     });
//     server.createHandler()(event, context, callback);
//   })
// }


const axios = require("axios")
const faunadb = require("faunadb");
const q = faunadb.query;

const createClient = async () => {
  const faunaSecret = process.env.FAUNA_GRIDSOME
  const client = new faunadb.Client({ secret: faunaSecret });
  return client;
};

const getRatings = async () => {
  const client = await createClient();
  try {
    const res = await client.query(
      q.Map(q.Paginate(q.Match(q.Ref("indexes/all_ratings"))), ref =>
        q.Get(ref)
      )
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
  exports.handler = async function(event, context, cb) {
    const ratings = await getRatings()
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({ ratings: ratings })
    };
  }