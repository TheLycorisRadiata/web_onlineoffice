/* A task has a state: created - ongoing - completed. */

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

let tasks = [];

div_task_interaction.classList.add('hidden');

btn_task_create.addEventListener('click', function()
{
	const task = 
	{
		id: 'ID' + Date.now(),
		state: 'created',
		content: input_task.value
	};

	if (task.content != '')
	{
		div_tasks.insertAdjacentHTML('beforeend', '<li id="' + task.id  + '" contenteditable="true" spellcheck="false">' + task.content + '</li>');
		tasks.push(task);

		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';

		input_number_task.max = tasks.length;
		input_number_task_modify.max = tasks.length;

		div_task_interaction.classList.remove('hidden');
	}
});

btn_task_mark_ongoing.addEventListener('click', function()
{
	let task = tasks[input_number_task.value - 1];
	if (task != null)
	{
		task = document.getElementById(task.id);
		task.style.textDecoration = 'none';
		if (task.classList.contains('task_ongoing'))
		{
			task.classList.remove('task_ongoing');
			task.style.color = color_text;
		}
		else
		{
			task.classList.add('task_ongoing');
			task.style.color = color_ongoing;
		}
		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';
	}
});

btn_task_complete.addEventListener('click', function()
{
	let task = tasks[input_number_task.value - 1];
	if (task != null)
	{
		task = document.getElementById(task.id);
		task.style.color = 'initial';
		task.style.textDecoration = 'line-through';
		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';
	}
});

btn_task_delete.addEventListener('click', function()
{
	let task = tasks[input_number_task.value - 1];
	if (task != null)
	{
		task = document.getElementById(task.id);
		tasks.splice(input_number_task.value - 1, 1);
		task.remove();

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
	}
});

btn_task_modify.addEventListener('click', function()
{
	const new_text = input_task_modify.value;
	let task = tasks[input_number_task.value - 1];

	if (task != null && new_text != '')
	{
		task = document.getElementById(task.id);
		task.innerText = new_text;
		input_task.value = '';
		input_number_task.value = '';
		input_number_task_modify.value = '';
		input_task_modify.value = '';
	}
});

