import { useEffect, useState } from "react";

import giftIcon from "./assets/giftbox.png";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
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
		setFilteredTasks(tasks?.filter((w) => w.status === status));
	};

	useEffect(() => {
		filterTasks(currentStatus);
	}, [tasks]);

	const handleRemoveTask = async (id) => {
		await api.deleteTask(id);
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
			await api.updateTask(id, {
				...newTask,
				status:
					newTask.status === STATUS.BOUGHT ? STATUS.PENDING : STATUS.BOUGHT,
			});
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

		for (const task of filteredTasks) {
			if (task.status === STATUS.BOUGHT) {
				listToBeRemoved.push(task);
			}
		}

		for (const task of listToBeRemoved) {
			await api.deleteTask(task.id);
		}

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
