import { useState, useEffect } from 'react'

// Today's date in YYYY-MM-DD format for the date input
const today = () => new Date().toISOString().split('T')[0]

const formatDateValue = (value) => {
  if (!value) return today()
  if (typeof value === 'string' && value.includes('T')) {
    return value.split('T')[0]
  }
  return value
}

function TaskForm({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('High')
  const [createdAt, setCreatedAt] = useState(today())

  const isEditing = Boolean(editingTask)

  // When an Edit button is clicked, load that task into the form
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.priority)
      setCreatedAt(formatDateValue(editingTask.createdAt))
    }
  }, [editingTask])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setPriority('High')
    setCreatedAt(today())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      createdAt,
    }

    if (isEditing) {
      onUpdateTask(editingTask.id, taskData)
    } else {
      onAddTask(taskData)
    }
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    onCancelEdit()
  }

  return (
    <div className="card tn-card mb-4">
      <div className="card-body p-4">
        <h2 className="tn-heading fs-4 mb-3">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label tn-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="taskDescription" className="form-label tn-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="taskDescription"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Priority + Date row */}
          <div className="row g-3 align-items-end mb-4">
            <div className="col-6 d-flex align-items-center gap-2">
              <label htmlFor="taskPriority" className="tn-label mb-0">
                Priority
              </label>
              <select
                className="form-select form-select-sm w-auto"
                id="taskPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end gap-2">
              <label htmlFor="taskDate" className="tn-label mb-0">
                Date
              </label>
              <input
                type="date"
                className="form-control form-control-sm w-auto"
                id="taskDate"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-tn-primary">
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn btn-tn-outline btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
