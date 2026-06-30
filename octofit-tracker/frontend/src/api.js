const API_PATHS = {
  users: 'users',
  teams: 'teams',
  activities: 'activities',
  leaderboard: 'leaderboard',
  workouts: 'workouts',
}

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/${API_PATHS[resource]}/`
}

export function normalizeCollection(payload, resource) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    payload[resource],
    payload.results,
    payload.docs,
    payload.items,
    payload.data,
  ]

  const collection = candidates.find(Array.isArray)
  return collection || []
}

export async function fetchCollection(resource) {
  const response = await fetch(getApiUrl(resource))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload, resource)
}
