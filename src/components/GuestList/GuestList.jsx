import React, { useEffect } from "react";
import "./GuestList.css";
import { useState } from "react";
import api from "../../api/api";

function GuestList({ currentAssignee, handleSelectListByGuest }) {
	const [guests, setGuests] = useState([]);

	const getAllGuests = async () => {
		const fetchedGuests = await api.getGuests();
		setGuests(fetchedGuests);
	};

	useEffect(() => {
		getAllGuests();
	}, []);

	return (
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
	);
}

export default GuestList;
