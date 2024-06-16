// App.js
import React, { useState } from "react";

// Child Component
const ChildComponent = ({ count, incrementCount }) => {
	return (
		<div className="bg-gray-100 rounded-lg p-4 shadow-md">
			<p className="text-xl font-bold">Count: {count}</p>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
				onClick={incrementCount}
			>
				Increment
			</button>
		</div>
	);
};

// App Component
const App = () => {
	const [count, setCount] = useState(0);

	const incrementCount = () => {
		setCount(count + 1);
	};

	return (
		<div className="bg-gray-200 min-h-screen flex items-center justify-center">
			<div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold mb-4">
					State and Props in React
				</h1>
				<ChildComponent
					count={count}
					incrementCount={incrementCount}
				/>
			</div>
		</div>
	);
};

export default App;
