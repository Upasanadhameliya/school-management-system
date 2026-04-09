const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc1NzI1NjUxLCJpYXQiOjE3NzU3MjIwNTEsImp0aSI6ImZlYjhmMDM1OTRhZDRjMzJiN2Y5ZGYzYjZkMmIyY2Y0IiwidXNlcl9pZCI6IjEifQ.gbOG4hnvGI8nleMExG0bBCrHNb96pdiV1irpLBULDE0'
const API_BASE = 'http://127.0.0.1:8000/api'

const getHeaders = () => ({
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
})

export const fetchStudents = async () => {
  const response = await fetch(`${API_BASE}/students/`, {
    method: 'GET',
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data = await response.json()
  return data.results || data
}

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_BASE}/students/${id}/`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(studentData)
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE}/students/${id}/`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response
}
