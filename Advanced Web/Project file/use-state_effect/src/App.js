// App.js
import React, { useEffect, useState } from "react";

const App = () => {
	const [count, setCount] = useState(0);
	const [message, setMessage] = useState("");

	useEffect(() => {
		setMessage(`Count has been updated to: ${count}`);
	}, [count]); // The effect will run only when 'count' changes

	return (
		<div className="App min-h-screen flex flex-col items-center justify-center text-black">
			<h1 className="text-4xl font-bold mb-4">
				Using useState and useEffect Hooks in React
			</h1>
			<p className="text-2xl mb-4">Count: {count}</p>
			<button
				className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mb-4 transition duration-300 ease-in-out"
				onClick={() => setCount(count + 1)}
			>
				Increment
			</button>
			<p className="text-lg">{message}</p>
		</div>
	);
};

export default App;
