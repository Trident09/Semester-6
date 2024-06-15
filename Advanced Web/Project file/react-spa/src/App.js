import React, { useEffect, useState } from "react";

// Initial tasks provided by the user
const initialTasks = [
	"Build a single page application using React.",
	"Create custom HTML elements using the web components standard.",
	"Build a rest-API using Node.js.",
	"Implement CRUD operations and integrate a database/mongoDB.",
	"Set up a Graph QL server.",
	"To create React Component.",
	"Implement State and Props in React.",
	"Implement Hooks (useState and useEffect) in React.",
	"How to handle form elements in React.",
	"Implement node.js events.",
	"Create database in MySQL and implement operations on it.",
	"Pass UserID to frontend.",
];

// Utility functions for local storage
const getLocalStorage = () => {
	const data = localStorage.getItem("tasks");
	return data
		? JSON.parse(data)
		: initialTasks.map((task) => ({ text: task, completed: false }));
};

const setLocalStorage = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const App = () => {
	const [tasks, setTasks] = useState(getLocalStorage());

	useEffect(() => {
		setLocalStorage(tasks);
	}, [tasks]);

	const toggleTaskCompletion = (index) => {
		const updatedTasks = tasks.map((task, i) =>
			i === index ? { ...task, completed: !task.completed } : task
		);
		setTasks(updatedTasks);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
				<h1 className="text-2xl font-bold mb-4">React SPA for the Web Dev Project</h1>
				<ul className="space-y-2">
					{tasks.map((task, index) => (
						<li
							key={index}
							className={`p-2 border border-gray-300 rounded flex justify-between items-center ${
								task.completed
									? "line-through text-gray-500"
									: ""
							}`}
						>
							<span
								onClick={() => toggleTaskCompletion(index)}
								className="cursor-pointer flex-1"
							>
								{task.text}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
