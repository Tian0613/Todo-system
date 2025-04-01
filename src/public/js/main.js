// 任务管理系统前端交互逻辑

document.addEventListener('DOMContentLoaded', () => {
  // 任务完成状态切换
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', async function() {
      const todoId = this.dataset.id;
      const completed = this.checked;
      
      try {
        const response = await fetch(`/todos/${todoId}/toggle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
          const taskText = this.closest('li').querySelector('.task-text');
          if (completed) {
            taskText.classList.add('completed');
          } else {
            taskText.classList.remove('completed');
          }
        }
      } catch (error) {
        console.error('Error toggling task status:', error);
      }
    });
  });

  // 编辑任务功能
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.closest('li');
      const taskText = listItem.querySelector('.task-text');
      const taskId = this.dataset.id;
      const currentText = taskText.textContent.trim();
      
      // 创建编辑表单
      const form = document.createElement('form');
      form.classList.add('edit-form');
      form.innerHTML = `
        <input type="text" class="form-control edit-input" value="${currentText}" required>
        <div class="edit-actions">
          <button type="submit" class="btn btn-sm btn-success save-btn">
            <i class="bi bi-check-lg"></i>
          </button>
          <button type="button" class="btn btn-sm btn-secondary cancel-btn">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `;
      
      // 隐藏任务显示元素
      listItem.querySelectorAll('.task-content, .task-actions').forEach(el => {
        el.style.display = 'none';
      });
      
      // 添加编辑表单
      listItem.appendChild(form);
      const editInput = form.querySelector('.edit-input');
      editInput.focus();
      editInput.setSelectionRange(0, editInput.value.length);
      
      // 保存编辑
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const newTitle = editInput.value.trim();
        
        if (newTitle) {
          try {
            const response = await fetch(`/todos/${taskId}/update`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title: newTitle })
            });
            
            if (response.ok) {
              taskText.textContent = newTitle;
              finishEditing();
            }
          } catch (error) {
            console.error('Error updating task:', error);
          }
        }
      });
      
      // 取消编辑
      form.querySelector('.cancel-btn').addEventListener('click', finishEditing);
      
      function finishEditing() {
        form.remove();
        listItem.querySelectorAll('.task-content, .task-actions').forEach(el => {
          el.style.display = 'flex';
        });
      }
    });
  });

  // 添加任务表单提交动画
  const addTaskForm = document.getElementById('add-task-form');
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', function() {
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 添加中...';
      submitBtn.disabled = true;
    });
  }

  // 任务过滤功能
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 移除所有按钮的活跃状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // 添加当前按钮的活跃状态
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const tasks = document.querySelectorAll('.todo-item');
        
        tasks.forEach(task => {
          const isCompleted = task.querySelector('.task-checkbox').checked;
          
          switch(filter) {
            case 'all':
              task.style.display = '';
              break;
            case 'active':
              task.style.display = isCompleted ? 'none' : '';
              break;
            case 'completed':
              task.style.display = isCompleted ? '' : 'none';
              break;
          }
        });
      });
    });
  }
});