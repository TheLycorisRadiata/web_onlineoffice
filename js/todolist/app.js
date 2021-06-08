const div_tasks = document.getElementById('div_tasks');
const input_task = document.getElementById('input_task');
const btn_task_create = document.getElementById('btn_task_create');
const div_task_interaction = document.getElementById('div_task_interaction');
const input_number_task = document.getElementById('input_number_task');
const btn_task_mark_ongoing = document.getElementById('btn_task_mark_ongoing');
const btn_task_complete = document.getElementById('btn_task_complete');
const btn_task_delete = document.getElementById('btn_task_delete');
const input_number_task_modify = document.getElementById('input_number_task_modify');
const input_task_modify = document.getElementById('input_task_modify');
const btn_task_modify = document.getElementById('btn_task_modify');

const todolist_from_local_storage = JSON.parse(localStorage.getItem('todolist'));
const tasks = todolist_from_local_storage != null ? todolist_from_local_storage : [];

(function()
{
	if (tasks.length == 0)
		div_task_interaction.classList.add('hidden');
	else
	{
		input_number_task.max = tasks.length;
		input_number_task_modify.max = tasks.length;

		for (const task of tasks)
		{
			div_tasks.insertAdjacentHTML('beforeend', '<li id="' + task.id  + '">' + task.content + '</li>');

			switch(task.state)
			{
				case 'ongoing':
					document.getElementById(task.id).classList.add('task_ongoing');
					document.getElementById(task.id).style.color = colors.ongoing;
					break;
				case 'completed':
					document.getElementById(task.id).style.color = 'initial';
					document.getElementById(task.id).style.textDecoration = 'line-through';
			}
		}
	}
})();

btn_task_create.addEventListener('click', function()
{
	const task = 
	{
		id: 'ID' + Date.now(),
		state: 'created', /* created - ongoing - completed */
		content: input_task.value
	};

	if (task.content != '')
	{
		div_tasks.insertAdjacentHTML('beforeend', '<li id="' + task.id  + '">' + task.content + '</li>');
		tasks.push(task);

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		input_number_task.max = tasks.length;
		input_number_task_modify.max = tasks.length;

		div_task_interaction.classList.remove('hidden');

		localStorage.setItem('todolist', JSON.stringify(tasks));
	}
});

btn_task_mark_ongoing.addEventListener('click', function()
{
	const task = tasks[input_number_task.value - 1];
	let task_element;

	if (task != null)
	{
		task_element = document.getElementById(task.id);
		task_element.style.textDecoration = 'none';

		if (task.state == 'ongoing')
		{
			task.state = 'created';
			task_element.classList.remove('task_ongoing');
			task_element.style.color = colors.text;
		}
		else
		{
			task.state = 'ongoing';
			task_element.classList.add('task_ongoing');
			task_element.style.color = colors.ongoing;
		}

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		localStorage.setItem('todolist', JSON.stringify(tasks));
	}
});

btn_task_complete.addEventListener('click', function()
{
	const task = tasks[input_number_task.value - 1];
	let task_element;

	if (task != null && task.state != 'completed')
	{
		task.state = 'completed';
		task_element = document.getElementById(task.id);
		task_element.style.color = 'initial';
		task_element.style.textDecoration = 'line-through';

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		localStorage.setItem('todolist', JSON.stringify(tasks));
	}
});

btn_task_delete.addEventListener('click', function()
{
	const task = tasks[input_number_task.value - 1];
	let task_element;

	if (task != null)
	{
		task_element = document.getElementById(task.id);
		tasks.splice(input_number_task.value - 1, 1);
		task_element.remove();

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		if (tasks.length == 0)
			div_task_interaction.classList.add('hidden');
		else
		{
			input_number_task.max = tasks.length;
			input_number_task_modify.max = tasks.length;
		}

		localStorage.setItem('todolist', JSON.stringify(tasks));
	}
});

btn_task_modify.addEventListener('click', function()
{
	const new_text = input_task_modify.value;
	const task = tasks[input_number_task_modify.value - 1];
	let task_element;

	if (task != null && new_text != '')
	{
		task_element = document.getElementById(task.id);
		task_element.innerText = new_text;

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		localStorage.setItem('todolist', JSON.stringify(tasks));
	}
});

