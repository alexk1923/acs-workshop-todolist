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

function App() {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [initialTasks, setInitialTasks] = useState([]);
	const [currentAssignee, setCurrentAssignee] = useState(-1);
	const [currentStatus, setCurrentStatus] = useState(STATUS.ALL);

	const getAllTasks = async () => {
		console.log("Se face cerere sa se preia toate task urile iar");

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
		console.log("");
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
		const newWish = tasks.find((w) => w.id == id);
		console.log("The new wish is:");
		console.log(newWish);

		if (newWish) {
			await api.updateTask(id, {
				...newWish,
				status:
					newWish.status === STATUS.BOUGHT ? STATUS.PENDING : STATUS.BOUGHT,
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

	const handleRemoveBoughtWishes = async () => {
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
			<div className='hero-section'>
				<h1 style={{ padding: "2rem" }}>New Year List</h1>
			</div>
			<div className='page-container'>
				<div>
					<NewTask addNewTask={addNewTask} />
					<div className='wishes-card'>
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
							handleRemoveBoughtWishes={handleRemoveBoughtWishes}
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
