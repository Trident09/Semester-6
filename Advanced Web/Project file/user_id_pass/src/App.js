import "chart.js/auto";
import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getFirestore,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCiY_lVqqd9JG1WifeLANcH1u5KnHdlm8M",
	authDomain: "web-dev-project-sem6.firebaseapp.com",
	projectId: "web-dev-project-sem6",
	storageBucket: "web-dev-project-sem6.appspot.com",
	messagingSenderId: "228672974177",
	appId: "1:228672974177:web:00bf245faa0101b253e920",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

const App = () => {
	const [user] = useAuthState(auth);
	const [entries, setEntries] = useState([]);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [mood, setMood] = useState("");

	const moodOptions = ["Happy", "Sad", "Angry", "Excited", "Neutral"];

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, "moodEntries"),
				where("userId", "==", user.uid)
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const entriesData = [];
				querySnapshot.forEach((doc) => {
					entriesData.push({ ...doc.data(), id: doc.id });
				});
				setEntries(entriesData);
			});
			return () => unsubscribe();
		}
	}, [user]);

	const handleLogin = async () => {
		await signInWithPopup(auth, provider);
	};

	const handleLogout = () => {
		signOut(auth);
	};

	const addEntry = async () => {
		if (!date || !time || !mood) return;
		await addDoc(collection(db, "moodEntries"), {
			date,
			time,
			mood,
			createdAt: new Date(),
			userId: user.uid,
		});
		setDate("");
		setTime("");
		setMood("");
	};

	const deleteEntry = async (id) => {
		await deleteDoc(doc(db, "moodEntries", id));
	};

	const moodData = {
		labels: entries.map((entry) => `${entry.date} ${entry.time}`),
		datasets: [
			{
				label: "Mood",
				data: entries.map(
					(entry) => moodOptions.indexOf(entry.mood) + 1
				),
				fill: false,
				borderColor: "blue",
			},
		],
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex flex-col items-center justify-center p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Mood Journal
				</h1>
				{user ? (
					<>
						<p className="text-xl mb-4">
							Hello, {user.displayName}!
						</p>
						<p className="text-sm mb-4">UserID: {user.uid}</p>
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 w-full"
						>
							Logout
						</button>
						<div className="mb-4">
							<input
								type="date"
								className="border p-2 w-full rounded mb-2"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
							<input
								type="time"
								className="border p-2 w-full rounded mb-2"
								value={time}
								onChange={(e) => setTime(e.target.value)}
							/>
							<select
								className="border p-2 w-full rounded mb-2"
								value={mood}
								onChange={(e) => setMood(e.target.value)}
							>
								<option value="">Select Mood</option>
								{moodOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option}
									</option>
								))}
							</select>
							<button
								onClick={addEntry}
								className="bg-blue-500 text-white px-4 py-2 rounded w-full"
							>
								Add Entry
							</button>
						</div>
						<ul>
							{entries.map((entry) => (
								<li
									key={entry.id}
									className="flex justify-between items-center bg-gray-100 p-3 my-2 rounded shadow-sm"
								>
									<span>{`${entry.date} ${entry.time} - ${entry.mood}`}</span>
									<button
										onClick={() => deleteEntry(entry.id)}
										className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
									>
										Delete
									</button>
								</li>
							))}
						</ul>
						<div className="mt-6">
							<Line data={moodData} />
						</div>
					</>
				) : (
					<button
						onClick={handleLogin}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
					>
						Login with Google
					</button>
				)}
			</div>
		</div>
	);
};

export default App;
