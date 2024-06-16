import React, { useState } from "react";

// ItemList Component
const ItemList = ({ items, color }) => {
	return (
		<ul className="list-disc pl-5 space-y-2">
			{items.map((item, index) => (
				<li
					key={index}
					className={`${color} p-4 m-2 rounded-lg`}
				>
					{item}
				</li>
			))}
		</ul>
	);
};

// App Component
const App = () => {
	const [numItems, setNumItems] = useState(4);
	const [color, setColor] = useState("bg-blue-200");

	const handleNumItemsChange = (e) => {
		setNumItems(Number(e.target.value));
	};

	const handleColorChange = (e) => {
		setColor(e.target.value);
	};

	const items = Array.from(
		{ length: numItems },
		(_, index) => `Item ${index + 1}`
	);

	return (
		<div className="App min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
			<div className="bg-white shadow-lg rounded-lg p-8">
				<h1 className="text-2xl font-bold mb-4">Item List</h1>
				<div className="mb-4">
					<label className="block mb-2 font-semibold">
						Number of Items:
					</label>
					<input
						type="number"
						min="1"
						value={numItems}
						onChange={handleNumItemsChange}
						className="border rounded p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2 font-semibold">
						Item Color:
					</label>
					<select
						value={color}
						onChange={handleColorChange}
						className="border rounded p-2 w-full"
					>
						<option value="bg-red-200">Red</option>
						<option value="bg-blue-200">Blue</option>
						<option value="bg-green-200">Green</option>
						<option value="bg-yellow-200">Yellow</option>
					</select>
				</div>
				<ItemList
					items={items}
					color={color}
				/>
			</div>
		</div>
	);
};

export default App;
