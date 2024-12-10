import React from "react";
import "./ListFooter.css";
import { STATUS } from "../../constants/constants";

function ListFooter({
	filteredTasks,
	currentStatus,
	filterTasks,
	handleRemoveBoughtTasks,
}) {
	return (
		<div className='task-list-footer'>
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
				{/* @TODO: The same as the above for STATUS.PENDING and STATUS.BOUGHT */}
			</div>

			<span onClick={handleRemoveBoughtTasks} style={{ cursor: "pointer" }}>
				Clear bought ones
			</span>
		</div>
	);
}

export default ListFooter;
