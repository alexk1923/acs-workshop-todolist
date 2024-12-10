import React, { useEffect } from "react";
import { useState } from "react";
import "./NewTask.css";
import api from "../../api/api";

function NewTask({ addNewTask }) {
	const [newTask, setNewTask] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newAssignee, setNewAssignee] = useState("All");
	const [newDueDate, setNewDueDate] = useState(new Date());
	const [guests, setGuests] = useState([]);

	const handleAddNewTask = () => {
		addNewTask(newTask, newDescription, newAssignee, newDueDate);
		setNewTask("");
		setNewDescription("");
		setNewAssignee("All");
		setNewDueDate(null);
	};
	const getAllGuests = async () => {
		const fetchedGuests = await api.getGuests();
		setGuests(fetchedGuests);
	};

	useEffect(() => {
		getAllGuests();
	}, []);

	return (
		<div className='new-task-container'>
			<input
				placeholder='Create new task...'
				type='text'
				onChange={(e) => {
					setNewTask(e.target.value);
					console.log(e.target.value);
				}}
				className='wish-input'
				value={newTask}
			/>

			<textarea
				placeholder='Description...'
				onChange={(e) => {
					setNewDescription(e.target.value);
					console.log(e.target.value);
				}}
				className='task-description-input'
				value={newDescription}
			/>

			<div>
				<span style={{ color: "black", marginRight: "0.5rem" }}>Assignee:</span>
				<select
					value={newAssignee}
					onChange={(e) => setNewAssignee(e.target.value)}
					className='new-task-input'
				>
					{guests.map((guest) => (
						<option value={guest.id}>
							{guest.firstName} {guest.lastName}
						</option>
					))}
				</select>
			</div>

			<div>
				<label
					htmlFor='dueDate'
					style={{ color: "black", marginRight: "0.5rem" }}
				>
					Due date
				</label>
				<input
					type='date'
					name='dueDate'
					id='dueDate'
					value={newDueDate}
					onChange={(e) => setNewDueDate(e.target.value)}
					className='new-task-input'
				/>
			</div>

			<button onClick={handleAddNewTask}>Add</button>
		</div>
	);
}

export default NewTask;