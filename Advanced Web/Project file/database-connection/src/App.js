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
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [currentTaskId, setCurrentTaskId] = useState(null);

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, "tasks"),
				where("userId", "==", user.uid)
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const tasksData = [];
				querySnapshot.forEach((doc) => {
					tasksData.push({ ...doc.data(), id: doc.id });
				});
				setTasks(tasksData);
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

	const addTask = async () => {
		if (newTask.trim() === "") return;
		await addDoc(collection(db, "tasks"), {
			text: newTask,
			createdAt: new Date(),
			userId: user.uid,
		});
		setNewTask("");
	};

	const editTask = (task) => {
		setIsEditing(true);
		setNewTask(task.text);
		setCurrentTaskId(task.id);
	};

	const updateTask = async () => {
		if (newTask.trim() === "") return;
		const taskDoc = doc(db, "tasks", currentTaskId);
		await updateDoc(taskDoc, { text: newTask });
		setNewTask("");
		setIsEditing(false);
		setCurrentTaskId(null);
	};

	const deleteTask = async (id) => {
		await deleteDoc(doc(db, "tasks", id));
	};

	return (
		<div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex flex-col items-center justify-center p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">
					ToDo App
				</h1>
				{user ? (
					<>
						<p className="text-xl mb-4">
							Hello, {user.displayName}! These are your tasks:
						</p>
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 w-full"
						>
							Logout
						</button>
						<div className="mb-4">
							<input
								type="text"
								className="border p-2 w-full rounded mb-2"
								placeholder="Enter task"
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
							/>
							<button
								onClick={isEditing ? updateTask : addTask}
								className={`${
									isEditing
										? "bg-yellow-500 hover:bg-yellow-600"
										: "bg-blue-500 hover:bg-blue-600"
								} text-white px-4 py-2 rounded w-full`}
							>
								{isEditing ? "Update Task" : "Add Task"}
							</button>
						</div>
						<ul>
							{tasks.map((task) => (
								<li
									key={task.id}
									className="flex justify-between items-center bg-gray-100 p-3 my-2 rounded shadow-sm"
								>
									<span>{task.text}</span>
									<div>
										<button
											onClick={() => editTask(task)}
											className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
										>
											Edit
										</button>
										<button
											onClick={() => deleteTask(task.id)}
											className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
										>
											Delete
										</button>
									</div>
								</li>
							))}
						</ul>
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
