function ResourceState({ loading, error, children }) {
  if (loading) {
    return <p className="status-message">Loading latest OctoFit data...</p>
  }

  if (error) {
    return <p className="status-message text-danger">{error}</p>
  }

  return children
}

export default ResourceState
