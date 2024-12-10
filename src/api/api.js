import { API_URL } from "./config";

async function getGuests() {
	try {
		// @TODO: Complete guest request
	} catch (error) {
		// Log error
	}
}

async function updateTask(taskId, updatedTask) {
	try {
		console.log("Updating task...");

		const response = await fetch(`${API_URL}/tasks/${taskId}`, {
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
		const response = await fetch(`${API_URL}/tasks`, {
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
		// @TODO: Implement a POST Request
	} catch (error) {
		console.error("Error adding task:", error);
	}
}

async function deleteTask(taskId) {
	try {
		// @TODO: Implement a DELETE Request
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
