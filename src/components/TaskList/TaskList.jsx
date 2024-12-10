import React from "react";
import "./TaskList.css";
import { STATUS } from "../../constants/constants";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import trashIcon from "../../assets/trash.png";

function TaskList({ listOfTasks, handleMarkTask, handleRemoveTask }) {
	return (
		<div>
			{
				<div className='task-list'>
					{listOfTasks?.map(
						({ id, title, status, description, guest, dueDate }) => (
							<div className='task-row'>
								<div className='task-entry'>
									<div className='task-container' key={id}>
										<div className='task-title-container'>
											<div
												onClick={() => handleMarkTask(id)}
												style={{
													cursor: "pointer",
													display: "flex",
													aspectRatio: 1 / 1,
												}}
											>
												{status === STATUS.BOUGHT ? (
													<MdOutlineCheckBox />
												) : (
													<MdOutlineCheckBoxOutlineBlank />
												)}
											</div>
											<span
												className={
													status === STATUS.BOUGHT ? "bought-task" : ""
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
									onClick={() => handleRemoveTask(id)}
									width={32}
									height={32}
								/>
							</div>
						)
					)}
				</div>
			}
		</div>
	);
}

export default TaskList;
