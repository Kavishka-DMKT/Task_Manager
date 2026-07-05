// Priority chip modifier classes (colors defined in index.css)
const PRIORITY_CLASS = {
  High: 'is-high',
  Medium: 'is-medium',
  Low: 'is-low',
}

function TaskCard({ task, onToggleStatus, onDeleteTask, onEditTask }) {
  const isCompleted = task.status === 'Completed'

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="card tn-card">
      <div className="card-body p-3 p-sm-4">
        {/* Top row: status toggle + priority chip */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <button
            type="button"
            className={`tn-status ${isCompleted ? 'is-done' : ''}`}
            onClick={() => onToggleStatus(task.id, task.status)}
            aria-pressed={isCompleted}
          >
            {isCompleted ? 'Done' : 'Undone'}
          </button>

          <span className={`tn-priority ${PRIORITY_CLASS[task.priority] || ''}`}>
            {task.priority}
          </span>
        </div>

        {/* Title + description */}
        <h3 className={`fs-6 fw-bold mb-1 ${isCompleted ? 'tn-title-done' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="small text-muted mb-3 text-truncate">{task.description}</p>
        )}

        {/* Bottom row: date chip + actions */}
        <div className="d-flex align-items-center flex-wrap gap-2">
          <span className="tn-label mb-0">Date</span>
          <span className="tn-date-chip">{formattedDate}</span>

          <div className="ms-auto d-flex gap-2">
            <button
              type="button"
              className="btn btn-tn-dark btn-sm px-3"
              onClick={() => onEditTask(task)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-tn-outline btn-sm px-3"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
