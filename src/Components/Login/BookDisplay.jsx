import React from 'react'

const BookDisplay = (props) => {
	return (
		<div className="mx-5 text-center">
			<h3>Issued Books</h3>
			<table className="table table-bordered table-dark">
				<thead className="thead-dark">
					<tr>
						<th>Title</th>
						<th>Subtitle</th>
						<th>Author</th>
						<th>Publisher</th>
						<th>Pages</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{props.issuedBooks
						.filter((data) => data.issuedBy === props.currentUser)
						.map((item) => (
							<tr>
								<td>{item.title}</td>
								<td>{item.subtitle}</td>
								<td>{item.author}</td>
								<td>{item.publisher}</td>
								<td>{item.pages}</td>
								<td>{item.description}</td>
								<td>
									<button
										className="btn btn-danger w-100 my-2"
										onClick={() =>
											props.returnBook(item.id)
										}
									>
										Return
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<h3>All Books</h3>
			<table className="table table-bordered table-dark">
				<thead className="thead-dark">
					<tr>
						<th>Title</th>
						<th>Subtitle</th>
						<th>Author</th>
						<th>Publisher</th>
						<th>Pages</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{props.Books.map((item) => (
						<tr>
							<td>{item.title}</td>
							<td>{item.subtitle}</td>
							<td>{item.author}</td>
							<td>{item.publisher}</td>
							<td>{item.pages}</td>
							<td>{item.description}</td>
							<td>
								<button
									className="btn btn-success w-100 my-2"
									onClick={() => props.issueBook(item.id)}
								>
									Issue
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default BookDisplay
