import { useEffect, useState } from "react";

import "./App.css";
import api from "./api/api";
import TaskList from "./components/TaskList/TaskList";
import NewTask from "./components/NewTask/NewTask";
import GuestList from "./components/GuestList/GuestList";
import ListFooter from "./components/ListFooter/ListFooter";
import { STATUS } from "./constants/constants";
import Title from "./components/Title/Title";

function App() {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [initialTasks, setInitialTasks] = useState([]);
	const [currentAssignee, setCurrentAssignee] = useState(-1);
	const [currentStatus, setCurrentStatus] = useState(STATUS.ALL);

	const getAllTasks = async () => {
		const fetchedTasks = await api.getTasks();
		setTasks(fetchedTasks);
		setFilteredTasks(fetchedTasks);
		setInitialTasks(fetchedTasks);
	};

	useEffect(() => {
		getAllTasks();
	}, []);

	useEffect(() => {
		setFilteredTasks(tasks);
	}, [tasks]);

	const filterTasks = (status) => {
		setCurrentStatus(status);

		if (status === STATUS.ALL) {
			setFilteredTasks(tasks);
			return;
		}

		// @TODO: Set new filtered tasks based on current status
	};

	useEffect(() => {
		filterTasks(currentStatus);
	}, [tasks]);

	const handleRemoveTask = async (id) => {
		// @TODO: Call the delete API
		getAllTasks();
	};

	const addNewTask = async (
		newTask,
		newDescription,
		newAssignee,
		newDueDate
	) => {
		if (newTask.length < 1 || newAssignee.length < 1) {
			return;
		}

		const newTaskPayload = {
			title: newTask,
			description: newDescription,
			guest: { id: newAssignee },
			dueDate: newDueDate,
			status: STATUS.PENDING,
		};

		console.log(newTaskPayload);

		await api.createTask(newTaskPayload);

		getAllTasks();
	};

	const handleMarkTask = async (id) => {
		const newTask = tasks.find((w) => w.id == id);

		if (newTask) {
			// @TODO: Create an update task payload, setting the status based on the current one,
			// if current is PENDING, set it to BOUGHT and otherwise
		}

		getAllTasks();
	};

	const handleSelectListByGuest = (guest) => {
		const newVal = guest;

		if (currentAssignee === newVal.id) {
			setCurrentAssignee(-1);
			return;
		}

		setCurrentAssignee(guest.id);
	};

	useEffect(() => {
		if (currentAssignee === -1) {
			getAllTasks();
			return;
		}

		setTasks(initialTasks.filter((w) => w.guest.id === currentAssignee));
		setFilteredTasks(
			initialTasks.filter((w) => w.guest.id === currentAssignee)
		);
	}, [currentAssignee]);

	const handleRemoveBoughtTasks = async () => {
		const listToBeRemoved = [];

		// @TODO: Get the list of tasks to be removed from filtered tasks

		getAllTasks();
	};

	return (
		<>
			<Title />
			<div className='page-container'>
				<div>
					<NewTask addNewTask={addNewTask} />
					<div className='tasks-card'>
						<TaskList
							listOfTasks={filteredTasks}
							handleMarkTask={handleMarkTask}
							handleRemoveTask={handleRemoveTask}
						/>
						<ListFooter
							setFilteredTasks={setFilteredTasks}
							filteredTasks={filteredTasks}
							filterTasks={filterTasks}
							currentStatus={currentStatus}
							setCurrentStatus={setCurrentStatus}
							handleRemoveBoughtTasks={handleRemoveBoughtTasks}
						/>
					</div>
				</div>
				<GuestList
					currentAssignee={currentAssignee}
					handleSelectListByGuest={handleSelectListByGuest}
				/>
			</div>
		</>
	);
}

export default App;
