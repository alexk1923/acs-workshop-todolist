import { useEffect, useState } from "react";
import trashIcon from "./assets/trash.png";
import giftIcon from "./assets/giftbox.png";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import "./App.css";
import api from "./api/api";

const STATUSES = {
	ALL: "ALL",
	PENDING: "Pending",
	SEARCHING: "In progress",
	BOUGHT: "Completed",
};

function App() {
	const [wishes, setWishes] = useState([]);
	const [newWish, setNewWish] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newAssignee, setNewAssignee] = useState("All");
	const [newDueDate, setNewDueDate] = useState(null);

	const [initialTasks, setInitialTasks] = useState([]);
	const [currentStatus, setCurrentStatus] = useState(STATUSES.ALL);
	const [filteredWishes, setFilteredWishes] = useState([]);

	const [guests, setGuests] = useState([]);
	const [currentAssignee, setCurrentAssignee] = useState(-1);

	const getAllGuests = async () => {
		const fetchedGuests = await api.getGuests();
		setGuests(fetchedGuests);
	};

	const getAllWishes = async () => {
		const fetchedWishes = await api.getTasks();
		setWishes(fetchedWishes);
		setFilteredWishes(fetchedWishes);
		setInitialTasks(fetchedWishes);
	};

	useEffect(() => {
		getAllWishes();
		getAllGuests();
	}, []);

	const filterWishes = (status) => {
		setCurrentStatus(status);
		if (status === STATUSES.ALL) {
			setFilteredWishes(wishes);
			return;
		}
		setFilteredWishes(wishes.filter((w) => w.status === status));
	};

	useEffect(() => {
		console.log("");
		filterWishes(currentStatus);
	}, [wishes]);

	const handleRemoveBoughtWishes = () => {
		setWishes(wishes.filter((w) => w.status !== STATUSES.BOUGHT));
	};

	const handleRemoveWish = async (id) => {
		// setWishes(wishes.filter((w) => w.id !== id));
		await api.deleteTask(id);
		getAllWishes();
	};

	const addNewWish = async () => {
		if (newWish.length < 1 || newAssignee.length < 1) {
			return;
		}

		console.log(newWish);
		console.log(newDescription);
		console.log(newAssignee);
		console.log(newDueDate);

		const newTask = {
			title: newWish,
			description: newDescription,
			guest: { id: newAssignee },
			dueDate: newDueDate,
			status: STATUSES.PENDING,
		};

		await api.createTask(newTask);
		setNewWish("");
		getAllWishes();
	};

	const handleMarkWish = async (id) => {
		// const newWishes = wishes.map((w) => {
		// 	if (w.id !== id) {
		// 		return w;
		// 	} else {
		// 		return {
		// 			...w,
		// 			status:
		// 				w.status === STATUSES.BOUGHT ? STATUSES.PENDING : STATUSES.BOUGHT,
		// 		};
		// 	}
		// });
		// console.log("new wishes");
		// console.log(newWishes);

		const newWish = wishes.find((w) => w.id == id);
		console.log("The new wish is:");
		console.log(newWish);

		if (newWish) {
			await api.updateTask(id, {
				...newWish,
				status:
					newWish.status === STATUSES.BOUGHT
						? STATUSES.PENDING
						: STATUSES.BOUGHT,
			});
		}

		// setWishes(newWishes);
		getAllWishes();
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
			getAllWishes();
			return;
		}

		setWishes(initialTasks.filter((w) => w.guest.id === currentAssignee));
	}, [currentAssignee]);

	return (
		<>
			<div className='hero-section'>
				<h1>New Year List</h1>
			</div>
			<div className='page-container'>
				<div>
					<div className='new-task-container'>
						<input
							placeholder='Create new task...'
							type='text'
							onChange={(e) => {
								setNewWish(e.target.value);
								console.log(e.target.value);
							}}
							className='wish-input'
							value={newWish}
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
							<span style={{ color: "black" }}>Assignee:</span>
							<select
								value={newAssignee}
								onChange={(e) => setNewAssignee(e.target.value)}
							>
								{guests.map((guest) => (
									<option value={guest.id}>
										{guest.firstName} {guest.lastName}
									</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor='dueDate' style={{ color: "black" }}>
								Due date
							</label>
							<input
								type='date'
								name='dueDate'
								id='dueDate'
								value={newDueDate}
								onChange={(e) => setNewDueDate(e.target.value)}
							/>
						</div>

						<button onClick={addNewWish}>Add</button>
					</div>
					<div className='wishes-card'>
						<div className='wish-list'>
							{filteredWishes.map(
								({ id, title, status, description, guest, dueDate }) => (
									<div className='wish-row'>
										<div className='wish-entry'>
											<div className='wish-container' key={id}>
												<div className='task-title-container'>
													<div
														onClick={() => handleMarkWish(id)}
														style={{
															cursor: "pointer",
															display: "flex",
															aspectRatio: 1 / 1,
														}}
													>
														{status === STATUSES.BOUGHT ? (
															<MdOutlineCheckBox />
														) : (
															<MdOutlineCheckBoxOutlineBlank />
														)}
													</div>
													<span
														className={
															status === STATUSES.BOUGHT ? "bought-wish" : ""
														}
													>
														{title}
													</span>
												</div>

												<span className='task-description'>
													Assigned to {guest.firstName} {guest.lastName}
												</span>

												<span className='task-description'>
													Due to {new Date(dueDate).toLocaleDateString()}
												</span>
												<span className='task-description'>{description}</span>
											</div>
										</div>
										<img
											src={trashIcon}
											onClick={() => handleRemoveWish(id)}
											width={32}
											height={32}
										/>

										{/* {optionsVisible && (
											<div className='options-menu'>
												<span style={{ color: "black" }}>Edit</span>
												<span
													style={{ backgroundColor: "red", color: "white" }}
												>
													Delete
												</span>
											</div>
										)} */}

										{/* <img
									src={trashIcon}
									style={{
										width: 32,
										height: 32,
										marginRight: "1rem",
									}}
									onClick={() => {
										handleRemoveWish(id);
									}}
								/> */}
									</div>
								)
							)}
						</div>

						<div className='wish-list-footer'>
							<span>{filteredWishes.length} items left</span>
							<div className='statuses'>
								<span
									onClick={() => filterWishes(STATUSES.ALL)}
									className={
										currentStatus === STATUSES.ALL
											? "status selected-status"
											: "status"
									}
								>
									All
								</span>
								<span
									onClick={() => filterWishes(STATUSES.PENDING)}
									className={
										currentStatus === STATUSES.PENDING
											? "status selected-status"
											: "status"
									}
								>
									Pending
								</span>
								<span
									onClick={() => filterWishes(STATUSES.SEARCHING)}
									className={
										currentStatus === STATUSES.SEARCHING
											? "status selected-status"
											: "status"
									}
								>
									Searching
								</span>
								<span
									onClick={() => filterWishes(STATUSES.BOUGHT)}
									className={
										currentStatus === STATUSES.BOUGHT
											? " status selected-status"
											: "status"
									}
								>
									Bought
								</span>
							</div>

							<span onClick={handleRemoveBoughtWishes}>Clear bought ones</span>
						</div>
					</div>
				</div>

				<div className='list-by-guest'>
					<h2>View specific list</h2>
					{guests.map((guest) => (
						<div
							className={
								currentAssignee === guest.id ? "item selected-item" : "item"
							}
							onClick={() => handleSelectListByGuest(guest)}
						>
							{guest.firstName} {guest.lastName}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
