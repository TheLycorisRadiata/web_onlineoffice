const div_main = document.createElement('div');
const title = document.createElement('h1');
const div_buttons = document.createElement('div');
const btn_add = document.createElement('input');
const btn_delete = document.createElement('input');
const btn_activate_deactivate = document.createElement('input');
const p_no_contact = document.createElement('p');
const input_lastname = document.createElement('input');
const input_firstname = document.createElement('input');
const form_new_contact = document.createElement('form');
const div_contacts = document.createElement('div');

let nbr_contacts = 0;
let contacts = [];
let button;

document.body.appendChild(div_main);
div_main.appendChild(title);
div_main.appendChild(div_buttons);
div_buttons.appendChild(btn_add);
div_buttons.appendChild(btn_delete);
div_buttons.appendChild(btn_activate_deactivate);
div_main.appendChild(p_no_contact);
div_main.appendChild(input_lastname);
div_main.appendChild(input_firstname);
div_main.appendChild(form_new_contact);
div_main.appendChild(div_contacts);

title.innerText = 'Address Book'.toUpperCase();
btn_add.setAttribute('type', 'button');
btn_add.setAttribute('value', 'Add');
btn_delete.setAttribute('type', 'button');
btn_delete.setAttribute('value', 'Delete');
btn_activate_deactivate.setAttribute('type', 'button');
btn_activate_deactivate.setAttribute('value', 'Activate/Deactivate');
p_no_contact.innerText = 'No contact';
input_lastname.setAttribute('type', 'text');
input_lastname.setAttribute('placeholder', 'Enter the contact\'s last name');
input_lastname.classList.add('hidden');
input_firstname.setAttribute('type', 'text');
input_firstname.setAttribute('placeholder', 'Enter the contact\'s first name');
input_firstname.classList.add('hidden');
form_new_contact.insertAdjacentHTML('afterbegin', 
	'<input type="text" id="lastname" placeholder="Last name" required><br>' + 
	'<input type="text" id="firstname" placeholder="First name" required><br>' + 
	'<input type="email" id="email" placeholder="Email address" required><br>' + 
	'<input type="tel" id="phone" placeholder="Phone number" required><br>' + 
	'<span id="option_pro"><input type="radio" name="type_of_contact" id="contact_pro" value="pro" checked>' + 
	'<label for="contact_pro">Professional contact</label></span>' + 
	' ' + 
	'<span id="option_perso"><input type="radio" name="type_of_contact" id="contact_perso" value="perso">' + 
	'<label for="contact_perso">Personal contact</label></span><br>' + 
	'<input type="url" id="link" placeholder="LinkedIn link" required><br>' + 
	'<input type="checkbox" id="status" checked>' + 
	'<label for="status">Status: Active</label><br>' + 
	'<input type="button" id="btn_submit" value="Add contact">');
form_new_contact.classList.add('hidden');

btn_add.addEventListener('click', function()
{
	if (nbr_contacts > 0)
	{
		p_no_contact.classList.add('hidden');
	}
	else
	{
		p_no_contact.classList.remove('hidden');
	}

	input_lastname.classList.add('hidden');
	input_firstname.classList.add('hidden');
	form_new_contact.classList.remove('hidden');
	button = 'add';
});

btn_delete.addEventListener('click', function()
{
	form_new_contact.classList.add('hidden');

	if (nbr_contacts > 0)
	{
		input_lastname.classList.remove('hidden');
		input_firstname.classList.remove('hidden');
		button = 'delete';
	}
});

btn_activate_deactivate.addEventListener('click', function()
{
	form_new_contact.classList.add('hidden');

	if (nbr_contacts > 0)
	{
		input_lastname.classList.remove('hidden');
		input_firstname.classList.remove('hidden');
		button = 'activate_deactivate';
	}
});

input_firstname.addEventListener('keyup', function(e)
{
	let index;

	if (input_lastname.value != '' && input_firstname.value != '' && e.key == 'Enter')
	{
		input_lastname.classList.add('hidden');
		input_firstname.classList.add('hidden');
		index = contacts.findIndex(x => x.lastname.toLowerCase() == input_lastname.value.toLowerCase() && x.firstname.toLowerCase() == input_firstname.value.toLowerCase());
		input_lastname.value = '';
		input_firstname.value = '';

		if (index == -1)
		{
			alert('Contact not found.');
		}
		else if (button == 'delete')
		{
			document.getElementById(contacts[index].id).remove();
			contacts.splice(index, 1);
			--nbr_contacts;
			if (nbr_contacts == 0)
			{
				p_no_contact.classList.remove('hidden');
			}
			alert('Contact deleted.');
		}
		else if (button == 'activate_deactivate')
		{
			contacts[index].is_active == true ? contacts[index].is_active = false : contacts[index].is_active = true;
			if (contacts[index].is_active == true)
			{
				document.getElementById(contacts[index].id).classList.add('active');
				document.getElementById(contacts[index].id).classList.remove('inactive');
			}
			else
			{
				document.getElementById(contacts[index].id).classList.add('inactive');
				document.getElementById(contacts[index].id).classList.remove('active');
			}
		}
	}
});

function display_contact(contact)
{
	let html_code = '<div id="' + contact.id + '">' + 
		'<ul>' + 
		'<li class="lastname"></li>' + 
		'<li class="firstname"></li>' + 
		'<li class="email"></li>' + 
		'<li class="phone"></li>' + 
		'<li class="link"><a href="#" target="_blank">See online account</a></li>' + 
		'</ul>' + 
		'<input type="button" value="Show presentation" id="btn_' + contact.id +'">' + 
		'</div>';

	div_contacts.insertAdjacentHTML('beforeend', html_code);
	document.querySelector('#' + contact.id + ' .lastname').innerText = contact.lastname;
	document.querySelector('#' + contact.id + ' .firstname').innerText = contact.firstname;
	document.querySelector('#' + contact.id + ' .email').innerText = contact.email;
	document.querySelector('#' + contact.id + ' .phone').innerText = contact.phone;
	document.querySelector('#' + contact.id + ' .link a').href = contact.link;

	contact.is_active ? document.getElementById(contact.id).classList.add('active') : document.getElementById(contact.id).classList.add('inactive');

	document.getElementById('btn_' + contact.id).addEventListener('click', function()
	{
		contact.present_contact();
	});
}

document.getElementById('option_pro').addEventListener('click', function()
{
	document.getElementById('link').placeholder = 'LinkedIn link';
});

document.getElementById('option_perso').addEventListener('click', function()
{
	document.getElementById('link').placeholder = 'Facebook link';
});

document.getElementById('btn_submit').addEventListener('click', function()
{
	const field_lastname = document.getElementById('lastname');
	const field_firstname = document.getElementById('firstname');
	const field_email = document.getElementById('email');
	const field_phone = document.getElementById('phone');
	const field_link = document.getElementById('link');
	const field_status = document.getElementById('status');

	const lastname = field_lastname.value;
	const firstname = field_firstname.value;
	const id = field_lastname.value + field_firstname.value + Date.now();
	const email = field_email.value;
	const phone = field_phone.value;
	const is_active = field_status.checked;
	const link = field_link.value;

	let new_contact;

	let field_type_of_contact = document.getElementById('contact_pro');
	if (field_type_of_contact.checked == false)
		field_type_of_contact = document.getElementById('contact_perso');

	if (field_lastname.value != '' && field_firstname.value != '' && field_email.value != '' && field_phone.value != '' && field_link.value != '')
	{
		if (field_type_of_contact.value == 'pro')
			new_contact = new ContactPro(lastname, firstname, id, email, phone, is_active, link);
		else
			new_contact = new ContactPerso(lastname, firstname, id, email, phone, is_active, link);

		field_lastname.value = '';
		field_firstname.value = '';
		field_email.value = '';
		field_phone.value = '';
		field_link.value = '';
		field_status.checked = true;
		document.getElementById('contact_pro').checked = true;
		document.getElementById('contact_perso').checked = false;
		contacts.push(new_contact);
		++nbr_contacts;
		form_new_contact.classList.add('hidden');
		display_contact(new_contact);
		p_no_contact.classList.add('hidden');
	}
});

