/* Todo App Frontend Logic */

document.addEventListener('DOMContentLoaded', () => {
  // 初始化Bootstrap工具提示
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // 任务完成状态切换
  document.querySelectorAll('.task-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', async function() {
      const todoId = this.dataset.id;
      const completed = this.checked;
      const listItem = this.closest('.todo-item');
      
      // 添加加载状态
      listItem.classList.add('updating');
      
      try {
        const response = await fetch(`/todos/${todoId}/toggle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
          const taskText = listItem.querySelector('.task-text');
          if (completed) {
            taskText.classList.add('completed');
            listItem.classList.add('bg-light');
          } else {
            taskText.classList.remove('completed');
            listItem.classList.remove('bg-light');
          }
          
          // 更新任务计数
          updateTaskCounter();
        }
      } catch (error) {
        console.error('切换任务状态时出错:', error);
        // 恢复原始状态
        this.checked = !completed;
      } finally {
        // 移除加载状态
        listItem.classList.remove('updating');
      }
    });
  });

  // 编辑任务功能
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.closest('.todo-item');
      const taskText = listItem.querySelector('.task-text');
      const taskId = this.dataset.id;
      const currentText = taskText.textContent.trim();
      
      // 创建编辑表单
      const form = document.createElement('form');
      form.classList.add('edit-form');
      form.innerHTML = `
        <div class="input-group">
          <input type="text" class="form-control edit-input" value="${currentText}" required>
          <button type="submit" class="btn btn-success btn-sm" data-bs-toggle="tooltip" title="保存">
            <i class="bi bi-check-lg"></i>
          </button>
          <button type="button" class="btn btn-secondary btn-sm cancel-edit" data-bs-toggle="tooltip" title="取消">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      `;
      
      // 标记任务项为编辑状态
      listItem.classList.add('editing');
      
      // 隐藏任务显示元素 - 使用CSS类控制而不是直接修改style
      // 这样可以避免界面元素重叠问题
      
      // 清除之前可能存在的编辑表单
      const existingForm = listItem.querySelector('.edit-form');
      if (existingForm) {
        existingForm.remove();
      }
      
      // 添加编辑表单
      listItem.appendChild(form);
      const editInput = form.querySelector('.edit-input');
      editInput.focus();
      editInput.setSelectionRange(0, editInput.value.length);
      
      // 初始化新添加的工具提示
      const newTooltips = [].slice.call(form.querySelectorAll('[data-bs-toggle="tooltip"]'));
      newTooltips.forEach(el => new bootstrap.Tooltip(el));
      
      // 保存编辑
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const newTitle = editInput.value.trim();
        
        if (newTitle) {
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
          submitBtn.disabled = true;
          
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
            console.error('更新任务时出错:', error);
            alert('更新任务失败，请重试');
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
            submitBtn.disabled = false;
          }
        }
      });
      
      // 取消编辑
      form.querySelector('.cancel-edit').addEventListener('click', finishEditing);
      
      function finishEditing() {
        // 销毁工具提示
        const tooltips = [].slice.call(form.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltips.forEach(el => {
          const tooltip = bootstrap.Tooltip.getInstance(el);
          if (tooltip) tooltip.dispose();
        });
        
        form.remove();
        // 移除编辑状态类，恢复原有内容的显示
        listItem.classList.remove('editing');
        // 不再需要直接修改style属性
        // listItem.querySelectorAll('.task-content, .task-actions').forEach(el => {
        //   el.style.display = '';
        // });
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
  
  // 更新任务计数器
  function updateTaskCounter() {
    const totalTasks = document.querySelectorAll('.todo-item').length;
    const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
    const activeTasks = totalTasks - completedTasks;
    
    // 更新计数显示
    document.querySelector('.total-counter').textContent = totalTasks;
    document.querySelector('.active-counter').textContent = activeTasks;
    document.querySelector('.completed-counter').textContent = completedTasks;
  }
  
  // 初始化计数
  updateTaskCounter();
  
  // 清空已完成任务
  const clearCompletedBtn = document.querySelector('.clear-completed-btn');
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', async function() {
      if (!confirm('确定要删除所有已完成的任务吗？')) return;
      
      this.disabled = true;
      this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 处理中...';
      
      try {
        const response = await fetch('/todos/clear-completed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          // 移除已完成的任务元素
          document.querySelectorAll('.task-checkbox:checked').forEach(checkbox => {
            checkbox.closest('.todo-item').remove();
          });
          
          // 更新计数
          updateTaskCounter();
        }
      } catch (error) {
        console.error('清除已完成任务时出错:', error);
        alert('操作失败，请重试');
      } finally {
        this.disabled = false;
        this.innerHTML = '清除已完成';
      }
    });
  }
  
  // 任务项动画效果
  document.querySelectorAll('.todo-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
    item.classList.add('animate-in');
  });
});