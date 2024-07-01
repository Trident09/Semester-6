// app.js
const { ApolloServer, gql } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");

// Sample data
let todos = [
	{ id: uuidv4(), title: "Learn GraphQL", completed: false },
	{ id: uuidv4(), title: "Build a GraphQL server", completed: false },
];

// Type definitions
const typeDefs = gql`
	type Todo {
		id: ID!
		title: String!
		completed: Boolean!
	}

	type Query {
		getTodos: [Todo]
		getTodoById(id: ID!): Todo
	}

	type Mutation {
		addTodo(title: String!): Todo
		updateTodo(id: ID!, title: String, completed: Boolean): Todo
		deleteTodo(id: ID!): String
	}
`;

// Resolvers
const resolvers = {
	Query: {
		getTodos: () => todos,
		getTodoById: (parent, args) =>
			todos.find((todo) => todo.id === args.id),
	},
	Mutation: {
		addTodo: (parent, args) => {
			const newTodo = {
				id: uuidv4(),
				title: args.title,
				completed: false,
			};
			todos.push(newTodo);
			return newTodo;
		},
		updateTodo: (parent, args) => {
			const todo = todos.find((todo) => todo.id === args.id);
			if (!todo) {
				throw new Error("Todo not found");
			}
			if (args.title !== undefined) {
				todo.title = args.title;
			}
			if (args.completed !== undefined) {
				todo.completed = args.completed;
			}
			return todo;
		},
		deleteTodo: (parent, args) => {
			const index = todos.findIndex((todo) => todo.id === args.id);
			if (index === -1) {
				throw new Error("Todo not found");
			}
			todos.splice(index, 1);
			return "Todo deleted";
		},
	},
};

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server is running at ${url}`);
});
