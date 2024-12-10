import React, { useEffect, useState } from "react";
import "./ListFooter.css";
import { STATUS } from "../../constants/constants";
import api from "../../api/api";

function ListFooter({
	filteredTasks,
	setFilteredTasks,
	currentStatus,
	setCurrentStatus,
	filterTasks,
	handleRemoveBoughtWishes,
}) {
	return (
		<div className='wish-list-footer'>
			<span>{filteredTasks?.length} items left</span>
			<div className='statuses'>
				<span
					onClick={() => filterTasks(STATUS.ALL)}
					className={
						currentStatus === STATUS.ALL ? "status selected-status" : "status"
					}
				>
					All
				</span>
				<span
					onClick={() => filterTasks(STATUS.PENDING)}
					className={
						currentStatus === STATUS.PENDING
							? "status selected-status"
							: "status"
					}
				>
					Pending
				</span>
				<span
					onClick={() => filterTasks(STATUS.BOUGHT)}
					className={
						currentStatus === STATUS.BOUGHT
							? " status selected-status"
							: "status"
					}
				>
					Bought
				</span>
			</div>

			<span onClick={handleRemoveBoughtWishes} style={{ cursor: "pointer" }}>
				Clear bought ones
			</span>
		</div>
	);
}

export default ListFooter;
