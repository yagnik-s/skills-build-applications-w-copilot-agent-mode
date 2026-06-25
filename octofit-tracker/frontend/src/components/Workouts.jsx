import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'
import ResourceState from './ResourceState'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts')
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load workouts from the OctoFit API.')
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
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <ResourceState loading={loading} error={error}>
        <div className="data-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id || workout.title}>
              <h2>{workout.title}</h2>
              <p>{workout.suggestedFor}</p>
              <dl>
                <div>
                  <dt>Focus</dt>
                  <dd>{workout.focusArea}</dd>
                </div>
                <div>
                  <dt>Difficulty</dt>
                  <dd>{workout.difficulty}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{workout.durationMinutes} min</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}

export default Workouts
