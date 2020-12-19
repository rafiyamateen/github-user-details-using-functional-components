import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import UserInput from './Components/UserInput/UserInput'
import UserDetails from './Components/UserDetails/UserDetails'
import NotFound from './Components/NotFound/NotFound'
import { Alert, Spinner } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState(''),
    [loading, setLoading] = useState(false),
    [details, setDetails] = useState([]),
    [error, setError] = useState(false),
    [alert, setAlert] = useState(false),
    fetchUser = () => {
      if (username) {
        setLoading(true)
        const url = `https://api.github.com/users/${username}`
        axios.get(url)
          .then((response) => {
            setLoading(false)
            setDetails({
              imgSrc: response.data.avatar_url || 'Not available',
              name: response.data.name || 'Not available',
              bio: response.data.bio || 'Not available',
              created_at: response.data.created_at || 'Not available',
              html_url: response.data.html_url || 'Not available',
              location: response.data.location || 'Not available',
              public_repos: response.data.public_repos || 'Not available'
            })
          })
          .catch(() => {
            setError(true)
            setLoading(false)
            setDetails([])
            document.getElementById('input').focus();
          })
      }
      else {
        setAlert(true)
        setDetails([])
        document.getElementById('input').focus();
      }
    }
  onchange = (e) => {
    setUsername(e.target.value)
    setAlert(false)
    setError(false)
  }
  return <>
    <h2 id='head'>Check details of any github user</h2>
    <div className='appContainer'>
      <UserInput fetchUser={fetchUser} onchange={onchange} />
      <Alert id='alert' show={alert} variant='dark'>
        Please enter a user name!
        </Alert>
      {loading ?
        <Spinner id='load' animation="border" variant="light" /> :
        <>
          {error ? <NotFound /> :
            <>
              {details.imgSrc ?
                <UserDetails details={details} /> : null}
            </>}
        </>}
    </div>
  </>
}
export default App