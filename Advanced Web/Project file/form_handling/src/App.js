import React, { useState } from "react";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is included in your project

const App = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Form submitted: ${JSON.stringify(formData)}`);
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<h1 className="text-3xl font-bold mb-8 text-gray-700">
				Handling Form Elements in React
			</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name:
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email:
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Message:
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</label>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</div>
			</form>
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-gray-700">
					Form Data:
				</h2>
				<p className="text-gray-700">
					<strong>Name:</strong> {formData.name}
				</p>
				<p className="text-gray-700">
					<strong>Email:</strong> {formData.email}
				</p>
				<p className="text-gray-700">
					<strong>Message:</strong> {formData.message}
				</p>
			</div>
		</div>
	);
};

export default App;
