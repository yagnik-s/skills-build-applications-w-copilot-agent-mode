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

export async function fetchCollection(endpoint, resource) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload, resource)
}
