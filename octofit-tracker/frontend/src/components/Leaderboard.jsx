import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then((items) => {
        if (isMounted) {
          setLeaderboard(items)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load leaderboard from the OctoFit API.')
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
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="rank-list">
          {leaderboard.map((entry) => (
            <article className="rank-row" key={entry._id || entry.rank}>
              <strong>#{entry.rank}</strong>
              <div>
                <h2>{entry.userName}</h2>
                <p>{entry.teamName}</p>
              </div>
              <span>{entry.points} pts</span>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Leaderboard
