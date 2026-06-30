import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load activities from the OctoFit API.')
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
        <p className="eyebrow">Training log</p>
        <h1>Activities</h1>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="table-wrap">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.userEmail}-${activity.completedAt}`}>
                  <td>{activity.activityType}</td>
                  <td>{activity.userEmail}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}

export default Activities
