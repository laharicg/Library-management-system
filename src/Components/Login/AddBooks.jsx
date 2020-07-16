import React, { useState } from 'react'

const AddBooks = (props) => {
	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [author, setAuthor] = useState('')
	const [publisher, setPublisher] = useState('')
	const [pages, setPages] = useState('')
	const [desc, setDesc] = useState('')

	const addInfo = () => {
		const data = {
			title: title,
			subtitle: subtitle,
			author: author,
			publisher: publisher,
			pages: pages,
			description: desc,
		}
		props.addBook(data)
	}

	return (
		<div className="offset-4 col-4 mb-5">
			<label htmlFor="title">Title</label>
			<input
				type="text"
				id="title"
				className="form-control"
				value={title}
				placeholder="Enter Data"
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor="subtitle">Subtitle</label>
			<input
				type="text"
				id="subtitle"
				className="form-control"
				value={subtitle}
				placeholder="Enter Data"
				onChange={(e) => setSubtitle(e.target.value)}
			/>
			<label htmlFor="author">Author</label>
			<input
				type="text"
				id="author"
				className="form-control"
				value={author}
				placeholder="Enter Data"
				onChange={(e) => setAuthor(e.target.value)}
			/>
			<label htmlFor="publisher">Publisher</label>
			<input
				type="text"
				id="publisher"
				className="form-control"
				value={publisher}
				placeholder="Enter Data"
				onChange={(e) => setPublisher(e.target.value)}
			/>
			<label htmlFor="pages">Pages</label>
			<input
				type="text"
				id="pages"
				className="form-control"
				value={pages}
				placeholder="Enter Data"
				onChange={(e) => setPages(e.target.value)}
			/>
			<label htmlFor="desc">Desciption</label>
			<input
				type="text"
				id="desc"
				className="form-control"
				value={desc}
				placeholder="Enter Data"
				onChange={(e) => setDesc(e.target.value)}
			/>
			<button className="btn btn-primary mt-5" onClick={addInfo}>
				Add
			</button>
		</div>
	)
}

export default AddBooks
