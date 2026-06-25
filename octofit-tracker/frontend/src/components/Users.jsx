import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load users from the OctoFit API.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="data-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.email}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <dl>
                <div>
                  <dt>Team</dt>
                  <dd>{user.team}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{user.role}</dd>
                </div>
                <div>
                  <dt>Weekly goal</dt>
                  <dd>{user.weeklyGoalMinutes} min</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Users
