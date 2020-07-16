import React from 'react'

const DisplayBooks = (props) => {
	return (
		<div>
			<div className="mt-3">
				<button
					className="btn btn-primary mb-5"
					onClick={() => props.setAdminView('add')}
				>
					Add Book
				</button>
			</div>
			<h5>List of unissued books</h5>
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
									className="btn btn-danger w-100 my-2"
									onClick={() => props.deleteBook(item.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DisplayBooks
