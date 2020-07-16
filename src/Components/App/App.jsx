import React, { useEffect, useState } from 'react'
import BookDisplay from '../Login/BookDisplay'
import Login from '../Login/Login'
import AdminDashboard from '../Login/AdminDashboard'

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [adminPortal, setAdminPortal] = useState(false)
	const [currentUser, setCurrentUser] = useState('')
	const [Books, setBooks] = useState([])
	const [Members, setMembers] = useState([])
	const [Admins, setAdmins] = useState([])
	const [issuedBooks, setIssuedBooks] = useState([])
	const [adminView, setAdminView] = useState('default')

	useEffect(() => {
		Promise.all([
			fetch('http://localhost:3001/books').then((res) => res.json()),
			fetch('http://localhost:3001/members').then((res) => res.json()),
			fetch('http://localhost:3001/admins').then((res) => res.json()),
		])
			.then(([books, members, admins]) => {
				setBooks(books.filter((data) => data.issuedBy === null))
				setIssuedBooks(books.filter((data) => data.issuedBy !== null))
				setMembers(members)
				setAdmins(admins)
			})
			.catch(() => console.log('Error'))
	}, [])

	useEffect(() => {
		const userId = localStorage.getItem('user_id')
		if (userId) {
			setLoggedIn(true)
			setAdminPortal(false)
			const val = Members.find((data) => data.id === userId)
			if (val !== undefined) setCurrentUser(val.name)
			else {
				const adminUser = Admins.find((data) => data.id === userId)
				setAdminPortal(true)
				if (adminUser !== undefined) setCurrentUser(adminUser.name)
			}
		}
	}, [Members, loggedIn, Admins])

	const memberLogIn = ({ email, password }) => {
		const validLogIn = Members.find(
			(mem) => mem.email === email && mem.password === password
		)

		if (validLogIn === undefined) {
			alert('Invalid Email and Password')
		} else {
			localStorage.setItem('user_id', validLogIn.id)
			setAdminPortal(false)
			setLoggedIn(true)
		}
	}

	const adminLogIn = ({ email, password }) => {
		const validLogIn = Admins.find(
			(mem) => mem.email === email && mem.password === password
		)

		if (validLogIn === undefined) {
			alert('Invalid Email and Password')
		} else {
			localStorage.setItem('user_id', validLogIn.id)
			setAdminPortal(true)
			setLoggedIn(true)
		}
	}

	const issueBook = async (id) => {
		console.log(issuedBooks)
		const temp = issuedBooks.filter((data) => data.issuedBy === currentUser)
		if (temp.length === 3) {
			alert('You can only issue 3 books at a time!')
			return
		}
		const tempBook = Books.filter((data) => data.id === id)
		// console.log(currentUser)
		tempBook[0].issuedBy = currentUser
		// console.log(tempBook)
		setBooks(Books.filter((data) => data.id !== id))
		setIssuedBooks(issuedBooks.concat(tempBook))

		await fetch(`http://localhost:3001/books/${tempBook[0].id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tempBook[0]),
		})
	}

	const returnBook = async (id) => {
		const tempBook = issuedBooks.filter((data) => data.id === id)
		tempBook[0].issuedBy = null
		// console.log(tempBook)
		setIssuedBooks(issuedBooks.filter((data) => data.id !== id))
		setBooks(Books.concat(tempBook))
		await fetch(`http://localhost:3001/books/${tempBook[0].id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tempBook[0]),
		})
	}

	const deleteBook = async (id) => {
		setBooks(Books.filter((item) => item.id !== id))
		await fetch(`http://localhost:3001/books/${id}`, {
			method: 'DELETE',
		})
	}

	const addBook = async (addData) => {
		setBooks(Books.concat(addData))
		addData.issuedBy = null
		setAdminView('default')
		await fetch('http://localhost:3001/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(addData),
		})
	}

	const logout = () => {
		localStorage.clear()
		setLoggedIn(false)
	}

	const dataProps = {
		Books: Books,
		Members: Members,
		Admins: Admins,
		currentUser: currentUser,
		issueBook: issueBook,
		returnBook: returnBook,
		issuedBooks: issuedBooks,
		deleteBook: deleteBook,
		addBook: addBook,
		adminView: adminView,
		setAdminView: setAdminView,
	}

	return (
		<div className="App text-white">
			{loggedIn === true ? (
				<div>
					{adminPortal === false ? (
						<div className="text-center">
							<h1>Welcome User</h1>
							<h1>{currentUser}</h1>
							<BookDisplay {...dataProps} />
							<button className="btn btn-danger" onClick={logout}>
								Log Out
							</button>
						</div>
					) : (
						<div className="text-center">
							<h1>Welcome Admin</h1>
							<AdminDashboard {...dataProps} />
							<button className="btn btn-danger" onClick={logout}>
								Log Out
							</button>
						</div>
					)}
				</div>
			) : (
				<Login memberLogIn={memberLogIn} adminLogIn={adminLogIn} />
			)}
		</div>
	)
}

export default App
