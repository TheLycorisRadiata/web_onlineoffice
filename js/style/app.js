const btn_style_color_default = document.getElementById('btn_style_color_default');
const btn_style_color_text = document.getElementById('btn_style_color_text');
const btn_style_color_background = document.getElementById('btn_style_color_background');
const btn_style_color_ongoing = document.getElementById('btn_style_color_ongoing');

const style_from_local_storage = JSON.parse(localStorage.getItem('style'));

const colors_default = 
{
	text: '#3C204C',
	background: '#926DE8',
	ongoing: '#7F0505'
}

const colors = style_from_local_storage ? style_from_local_storage : 
{
	text: colors_default.text,
	background: colors_default.background,
	ongoing: colors_default.ongoing
};

(function()
{
	document.body.style.color = colors.text;
	document.body.style.backgroundColor = colors.background;

	btn_style_color_text.value = colors.text;
	btn_style_color_background.value = colors.background;
	btn_style_color_ongoing.value = colors.ongoing;
})();

btn_style_color_default.addEventListener('click', function()
{
	const tasks_ongoing = document.getElementsByClassName('task_ongoing');

	colors.text = colors_default.text;
	colors.background = colors_default.background;
	colors.ongoing = colors_default.ongoing;

	document.body.style.color = colors.text;
	document.body.style.backgroundColor = colors.background;

	if (tasks_ongoing.length)
	{
		for (let task of tasks_ongoing)
		{
			task.style.color = colors.ongoing;
		}
	}

	localStorage.setItem('style', JSON.stringify(colors));
});

btn_style_color_text.addEventListener('click', function(e)
{
	colors.text = e.target.value;
	document.body.style.color = colors.text;

	localStorage.setItem('style', JSON.stringify(colors));
});

btn_style_color_background.addEventListener('click', function(e)
{
	colors.background = e.target.value;
	document.body.style.backgroundColor = colors.background;

	localStorage.setItem('style', JSON.stringify(colors));
});

btn_style_color_ongoing.addEventListener('click', function(e)
{
	const tasks_ongoing = document.getElementsByClassName('task_ongoing');
	colors.ongoing = e.target.value;

	if (tasks_ongoing.length)
	{
		for (let task of tasks_ongoing)
		{
			task.style.color = colors.ongoing;
		}
	}

	localStorage.setItem('style', JSON.stringify(colors));
});

