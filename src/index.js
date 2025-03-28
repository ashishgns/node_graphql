const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/?directConnection=true';

mongoose.connect(DB_URL);

const typeDefs = gql`
	type Query {
		getText: String!
	}
`;

const resolvers = {
	Query: {
		getText : () => {
			return "Hello Man!";
		}
	}
};


const app = express();

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers
});

const serverStart = async () => {

	await apolloServer.start();

	app.use(
	  '/graphql',
	  express.json(),
	  expressMiddleware(apolloServer)
	);
};

serverStart();

app.listen(6000, () => console.log('Server Started!'));