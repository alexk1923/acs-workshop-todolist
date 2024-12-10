import { API_URL } from "./config";

async function getGuests() {
	try {
		const response = await fetch(`${API_URL}/guest`);
		if (!response.ok) throw new Error("Failed to fetch GUESTS");

		const data = await response.json();
		console.log("Guests:", data);
		return data;
	} catch (error) {
		console.error("Error fetching guests:", error);
	}
}

async function updateTask(taskId, updatedTask) {
	try {
		console.log("Updating task...");

		const response = await fetch(`${API_URL}/task/${taskId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTask),
		});

		if (!response.ok) throw new Error("Failed to update task");

		const data = await response.json();
		console.log("Updated task:", data);
		return data;
	} catch (error) {
		console.error("Error adding task:", error);
	}
}

async function getTasks() {
	try {
		const response = await fetch(`${API_URL}/task`, {
			method: "GET",
		});
		if (!response.ok) {
			console.log(response);

			throw new Error("Failed to fetch TASKS");
		}

		const data = await response.json();
		console.log("Tasks:", data);
		return data;
	} catch (error) {
		console.error("Error fetching tasks:", error);
	}
}

async function createTask(task) {
	try {
		const response = await fetch(`${API_URL}/task`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		});

		if (!response.ok) {
			throw new Error("Failed to add task");
		}

		const data = await response.json();
		console.log("New Task:", data);
		return data;
	} catch (error) {
		console.error("Error adding task:", error);
	}
}

async function deleteTask(taskId) {
	try {
		const response = await fetch(`${API_URL}/task/${taskId}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete TASK");

		return;
	} catch (error) {
		console.error("Error deleting Task", error);
	}
}

const api = {
	getGuests,
	getTasks,
	createTask,
	deleteTask,
	updateTask,
};

export default api;
