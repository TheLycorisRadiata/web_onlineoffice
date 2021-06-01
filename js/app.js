/* The buttons "Show presentation" don't do a thing. */

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
input_lastname.style.visibility = 'hidden';
input_firstname.setAttribute('type', 'text');
input_firstname.setAttribute('placeholder', 'Enter the contact\'s first name');
input_firstname.style.visibility = 'hidden';
form_new_contact.insertAdjacentHTML('afterbegin', 
'<input type="text" id="lastname" placeholder="Last name"><br><input type="text" id="firstname" placeholder="First name"><br><input type="email" id="email" placeholder="Email address"><br><input type="tel" id="phone" placeholder="Phone number"><br><input type="checkbox" id="status" checked><label for="status">Status: Active</label><br><input type="button" id="btn_submit" value="Add contact">');
form_new_contact.style.visibility = 'hidden';

btn_add.addEventListener('click', function()
{
	nbr_contacts > 0 ? p_no_contact.style.visibility = 'hidden' : p_no_contact.style.visibility = 'visible';
	form_new_contact.style.visibility = 'visible';
});

btn_delete.addEventListener('click', function()
{
	if (nbr_contacts > 0)
	{
		input_lastname.style.visibility = 'visible';
		input_firstname.style.visibility = 'visible';
		button = 'delete';
	}
});

btn_activate_deactivate.addEventListener('click', function()
{
	if (nbr_contacts > 0)
	{
		input_lastname.style.visibility = 'visible';
		input_firstname.style.visibility = 'visible';
		button = 'activate_deactivate';
	}
});

input_firstname.addEventListener('keyup', function(e)
{
	let index;

	if (input_lastname.value != '' && input_firstname.value != '' && e.key == 'Enter')
	{
		input_lastname.style.visibility = 'hidden';
		input_firstname.style.visibility = 'hidden';
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
				p_no_contact.style.visibility = 'visible';
			alert('Contact deleted.');
		}
		else if (button == 'activate_deactivate')
		{
			contacts[index].is_visible == true ? contacts[index].is_visible = false : contacts[index].is_visible = true;
			if (contacts[index].is_visible == true)
			{
				document.getElementById(contacts[index].id).style.backgroundColor = 'initial';
			}
			else
			{
				document.getElementById(contacts[index].id).style.backgroundColor = '#9DA3A3';
			}
		}
	}
});

function print_contact(contact)
{
	let html_code = '<div id="' + contact.id + '"><ul><li class="lastname"></li><li class="firstname"></li><li class="email"></li><li class="phone"></li></ul><input type="button" value="Show presentation" id="btn_' + contact.id +'"></div>';
	div_contacts.insertAdjacentHTML('beforeend', html_code);
	document.querySelector('#' + contact.id + ' .lastname').innerText = contact.lastname;
	document.querySelector('#' + contact.id + ' .firstname').innerText = contact.firstname;
	document.querySelector('#' + contact.id + ' .email').innerText = contact.email;
	document.querySelector('#' + contact.id + ' .phone').innerText = contact.phone;

	if (contact.is_visible == false)
		document.getElementById(contact.id).style.backgroundColor = '#9DA3A3';
}

document.getElementById('btn_submit').addEventListener('click', function()
{
	const field_lastname = document.getElementById('lastname');
	const field_firstname = document.getElementById('firstname');
	const field_email = document.getElementById('email');
	const field_phone = document.getElementById('phone');
	const field_status = document.getElementById('status');

	if (field_lastname.value != '' && field_firstname.value != '' && field_email.value != '' && field_phone.value != '')
	{
		let new_contact = 
		{
			lastname: field_lastname.value,
			firstname: field_firstname.value,
			id: field_lastname.value + field_firstname.value + Date.now(),
			email: field_email.value,
			phone: field_phone.value,
			is_visible: field_status.checked,
			present_contact: function()
			{
				alert(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.`);
			}
		}

		field_lastname.value = '';
		field_firstname.value = '';
		field_email.value = '';
		field_phone.value = '';
		field_status.checked = true;
		contacts.push(new_contact);
		++nbr_contacts;
		form_new_contact.style.visibility = 'hidden';
		print_contact(new_contact);
		p_no_contact.style.visibility = 'hidden';
	}
});

