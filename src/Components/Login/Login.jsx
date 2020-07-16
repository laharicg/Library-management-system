import React, { useState, useEffect } from 'react'

const Login = ({ memberLogIn, adminLogIn }) => {
	const [view, setView] = useState('MEMBER_LOG_IN')

	const [info, setInfo] = useState({ email: '', password: '' })

	useEffect(() => {
		setInfo({ email: '', password: '' })
	}, [view])

	return (
		<div className="Log-in">
			{view === 'MEMBER_LOG_IN' ? (
				<div className="row">
					<div className="offset-4 text-center text-white">
						<h1 className="my-5">Member Login</h1>
						<input
							type="text"
							value={info.email}
							onChange={(event) =>
								setInfo({ ...info, email: event.target.value })
							}
							className="form-control my-2"
							placeholder="Enter email"
							required
						/>
						<input
							type="password"
							value={info.password}
							onChange={(event) =>
								setInfo({
									...info,
									password: event.target.value,
								})
							}
							className="form-control my-5"
							placeholder="Enter password"
							required
						/>
						<button
							className="btn btn-primary form-control my-2"
							onClick={() => memberLogIn(info)}
						>
							Log in
						</button>
						<button
							className="btn btn-danger form-control my-2"
							onClick={() => setView('ADMIN_LOG_IN')}
						>
							Go to admin login
						</button>
					</div>
				</div>
			) : null}

			{view === 'ADMIN_LOG_IN' ? (
				<div className="row">
					<div className="offset-4 col-4 text-center text-white">
						<h1 className="my-5">Admin Login</h1>
						<input
							type="text"
							value={info.email}
							onChange={(event) =>
								setInfo({ ...info, email: event.target.value })
							}
							className="form-control my-2"
							placeholder="Enter email"
							required
						/>
						<input
							type="password"
							value={info.password}
							onChange={(event) =>
								setInfo({
									...info,
									password: event.target.value,
								})
							}
							className="form-control my-2"
							placeholder="Enter password"
							required
						/>
						<button
							className="btn btn-primary form-control my-2"
							onClick={() => adminLogIn(info)}
						>
							Log in
						</button>
						<button
							className="btn btn-danger form-control my-2"
							onClick={() => setView('MEMBER_LOG_IN')}
						>
							Go to member login
						</button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default Login
