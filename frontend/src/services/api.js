const API_BASE = 'http://127.0.0.1:8000/api'

const getHeaders = () => {
  const accessToken = localStorage.getItem('access_token')
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
}

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

export const createStudent = async (studentData) => {
  const response = await fetch(`${API_BASE}/students/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(studentData)
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const fetchStudentTasks = async (studentId) => {
  const response = await fetch(`${API_BASE}/students/${studentId}/tasks/`, {
    method: 'GET',
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const fetchStudent = async (id) => {
  const response = await fetch(`${API_BASE}/students/${id}/`, {
    method: 'GET',
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_BASE}/tasks/${id}/`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(taskData)
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE}/tasks/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(taskData)
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return await response.json()
}

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}/`, {
    method: 'DELETE',
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  return response
}
