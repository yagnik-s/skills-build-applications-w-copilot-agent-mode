import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection(teamsEndpoint, 'teams')
      .then((items) => {
        if (isMounted) {
          setTeams(items)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load teams from the OctoFit API.')
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
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="data-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id || team.name}>
              <h2>{team.name}</h2>
              <p>{team.motto}</p>
              <dl>
                <div>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                </div>
                <div>
                  <dt>Weekly minutes</dt>
                  <dd>{team.weeklyMinutes}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Teams
