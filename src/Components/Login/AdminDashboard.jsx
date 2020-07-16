import React from 'react'
import AddBooks from './AddBooks'
import DisplayBooks from './DisplayBooks'

const AdminDashboard = (props) => {
	return (
		<div>
			<h3>Hello {props.currentUser}!</h3>

			<div>
				{props.adminView === 'add' ? (
					<AddBooks {...props} />
				) : (
					<DisplayBooks {...props} />
				)}
			</div>
		</div>
	)
}

export default AdminDashboard
