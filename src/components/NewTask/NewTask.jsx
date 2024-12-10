import React, { useEffect } from "react";
import { useState } from "react";
import "./NewTask.css";

function NewTask({ addNewTask }) {
	const [newTask, setNewTask] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newAssignee, setNewAssignee] = useState(-1);
	const [newDueDate, setNewDueDate] = useState(new Date());
	const [guests, setGuests] = useState([]);

	useEffect(() => {
		getAllGuests();
	}, []);

	useEffect(() => {
		if (guests.length > 0) {
			setNewAssignee(guests[0].id);
		}
	}, [guests]);

	const handleAddNewTask = () => {
		addNewTask(newTask, newDescription, newAssignee, newDueDate);
		setNewTask("");
		setNewDescription("");
		setNewAssignee(guests[0].id);
		setNewDueDate(null);
	};
	const getAllGuests = async () => {
		// @TODO Call the api and set state variable
	};

	return (
		<div className='new-task-container'>
			<input
				placeholder='Create new task...'
				type='text'
				onChange={(e) => {
					setNewTask(e.target.value);
				}}
				className='task-input'
				value={newTask}
			/>

			<textarea
				placeholder='Description...'
				onChange={(e) => {
					setNewDescription(e.target.value);
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
