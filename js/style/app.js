const btn_style_color_default = document.getElementById('btn_style_color_default');
const btn_style_color_text = document.getElementById('btn_style_color_text');
const btn_style_color_background = document.getElementById('btn_style_color_background');
const btn_style_color_ongoing = document.getElementById('btn_style_color_ongoing');

let color_text_default = '#000000';
let color_text = color_text_default;
let color_background_default = '#4AC48A';
let color_background = color_background_default;
let color_ongoing_default = '#0775AB';
let color_ongoing = color_ongoing_default;

document.body.style.color = color_text;
document.body.style.backgroundColor = color_background;

btn_style_color_default.addEventListener('click', function()
{
	const tasks_ongoing = document.getElementsByClassName('task_ongoing');

	color_text = color_text_default;
	color_background = color_background_default;
	color_ongoing = color_ongoing_default;

	document.body.style.color = color_text;
	document.body.style.backgroundColor = color_background;

	if (tasks_ongoing.length > 0)
	{
		for (let task of tasks_ongoing)
		{
			task.style.color = color_ongoing;
		}
	}
});

btn_style_color_text.addEventListener('click', function(e)
{
	color_text = e.target.value;
	document.body.style.color = color_text;
});

btn_style_color_background.addEventListener('click', function(e)
{
	color_background = e.target.value;
	document.body.style.backgroundColor = color_background;
});

btn_style_color_ongoing.addEventListener('click', function(e)
{
	const tasks_ongoing = document.getElementsByClassName('task_ongoing');
	color_ongoing = e.target.value;

	if (tasks_ongoing.length > 0)
	{
		for (let task of tasks_ongoing)
		{
			task.style.color = color_ongoing;
		}
	}
});

