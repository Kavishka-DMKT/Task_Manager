import TaskCard from './TaskCard.jsx'

function TaskList({ tasks, onToggleStatus, onDeleteTask, onEditTask }) {
  return (
    <section>
      <h2 className="tn-heading fs-3 mb-1">Active Tasks</h2>
      <p className="text-muted small mb-3">
        All the added tasks have been updated here.
      </p>

      {tasks.length === 0 ? (
        <div className="card tn-card">
          <div className="card-body text-center py-5">
            <p className="mb-0 text-muted">
              No tasks yet. Create your first task above.
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TaskList
