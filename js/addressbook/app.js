const div_buttons = document.getElementById('div_buttons');
const btn_add = document.getElementById('btn_add');
const btn_delete = document.getElementById('btn_delete');
const btn_activate_deactivate = document.getElementById('btn_activate_deactivate');
const p_no_contact = document.getElementById('p_no_contact');
const input_lastname = document.getElementById('input_lastname');
const input_firstname = document.getElementById('input_firstname');
const form_new_contact = document.querySelector('form');
const form_lastname = document.getElementById('lastname');
const form_firstname = document.getElementById('firstname');
const form_email = document.getElementById('email');
const form_phone = document.getElementById('phone');
const form_logo = document.getElementById('form_logo'); 
const form_link = document.getElementById('link');
const form_status = document.getElementById('status');
const form_contact_pro = document.getElementById('contact_pro');
const form_contact_perso = document.getElementById('contact_perso');
const div_contacts = document.getElementById('div_contacts');

const addressbook_from_local_storage = JSON.parse(localStorage.getItem('addressbook'));
const contacts = addressbook_from_local_storage != null ? addressbook_from_local_storage : [];

let last_button;

function display_contact(contact)
{
	let html_code = '<div id="' + contact.id + '">' + 
		'<ul>' + 
		'<li class="contact_field"><span class="fullname"></span></li>' + 
		'<li class="contact_field"><i class="fas fa-envelope"></i><span class="email"></span></li>' + 
		'<li class="contact_field"><i class="fas fa-phone-alt"></i><span class="phone"></span></li>' + 
		'<li class="contact_field link"><img class="logo" src="" alt=""><a href="#" rel="ugc" target="_blank">See online account</a></li>' + 
		'</ul>' + 
		'<input type="button" value="Show presentation" id="btn_' + contact.id +'" name="btn_' + contact.id + '">' + 
		'</div>';

	div_contacts.insertAdjacentHTML('beforeend', html_code);
	document.querySelector('#' + contact.id + ' .fullname').innerText = contact.lastname.toUpperCase() + ' ' + contact.firstname;
	document.querySelector('#' + contact.id + ' .email').innerText = contact.email;
	document.querySelector('#' + contact.id + ' .phone').innerText = contact.phone;
	document.querySelector('#' + contact.id + ' .link a').href = contact.link;
	if (contact instanceof ContactPro)
	{
		document.querySelector('#' + contact.id + ' .link img').src = './images/logo_linkedin.png';
		document.querySelector('#' + contact.id + ' .link img').alt = 'LinkedIn logo';
	}
	else
	{
		document.querySelector('#' + contact.id + ' .link img').src = './images/logo_facebook.png';
		document.querySelector('#' + contact.id + ' .link img').alt = 'Facebook logo';
	}

	contact.is_active ? document.getElementById(contact.id).classList.add('active') : document.getElementById(contact.id).classList.add('inactive');

	document.getElementById('btn_' + contact.id).addEventListener('click', function()
	{
		if (contact instanceof ContactPro)
			ContactPro.present_contact(contact);
		else
			ContactPerso.present_contact(contact);
	});
}

(function()
{
	if (contacts.length != 0)
	{
		p_no_contact.classList.add('hidden');
		contacts.forEach(e => display_contact(e));
	}
})();

btn_add.addEventListener('click', function()
{
	if (contacts.length == 0)
		p_no_contact.classList.remove('hidden');
	else
		p_no_contact.classList.add('hidden');

	input_lastname.classList.add('hidden');
	input_firstname.classList.add('hidden');

	if (last_button == 'add')
	{
		form_new_contact.classList.add('hidden');
		form_lastname.value = '';
		form_firstname.value = '';
		form_email.value = '';
		form_phone.value = '';
		form_link.value = '';
		form_status.checked = true;
		form_contact_pro.checked = true;
		form_contact_perso.checked = false;
		form_link.placeholder = 'LinkedIn link';
		form_logo.src = './images/logo_linkedin.png';
		form_logo.alt = 'LinkedIn logo';
		last_button = '';
	}
	else
	{
		form_new_contact.classList.remove('hidden');
		last_button = 'add';
	}
});

btn_delete.addEventListener('click', function()
{
	form_new_contact.classList.add('hidden');

	if (contacts.length > 0)
	{
		if (last_button == 'delete')
		{
			input_lastname.classList.add('hidden');
			input_firstname.classList.add('hidden');
			input_lastname.value = '';
			input_firstname.value = '';
			last_button = '';
		}
		else
		{
			input_lastname.classList.remove('hidden');
			input_firstname.classList.remove('hidden');
			last_button = 'delete';
		}
	}
	else
		last_button = '';
});

btn_activate_deactivate.addEventListener('click', function()
{
	form_new_contact.classList.add('hidden');

	if (contacts.length > 0)
	{
		input_lastname.classList.remove('hidden');
		input_firstname.classList.remove('hidden');
	
		if (last_button == 'activate_deactivate')
		{
			input_lastname.classList.add('hidden');
			input_firstname.classList.add('hidden');
			input_lastname.value = '';
			input_firstname.value = '';
			last_button = '';
		}
		else
		{
			input_lastname.classList.remove('hidden');
			input_firstname.classList.remove('hidden');
			last_button = 'activate_deactivate';
		}
	}
	else
		last_button = '';
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
		else if (last_button == 'delete')
		{
			document.getElementById(contacts[index].id).remove();
			contacts.splice(index, 1);
			localStorage.setItem('addressbook', JSON.stringify(contacts));
			if (contacts.length == 0)
			{
				p_no_contact.classList.remove('hidden');
			}
			alert('Contact deleted.');
		}
		else if (last_button == 'activate_deactivate')
		{
			contacts[index].is_active == true ? contacts[index].is_active = false : contacts[index].is_active = true;
			localStorage.setItem('addressbook', JSON.stringify(contacts));
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

		last_button = '';
	}
});

document.getElementById('option_pro').addEventListener('click', function()
{
	form_link.placeholder = 'LinkedIn link';
	form_logo.src = './images/logo_linkedin.png';
	form_logo.alt = 'LinkedIn logo';
});

document.getElementById('option_perso').addEventListener('click', function()
{
	form_link.placeholder = 'Facebook link';
	form_logo.src = './images/logo_facebook.png';
	form_logo.alt = 'Facebook logo';
});

document.getElementById('btn_submit').addEventListener('click', function()
{
	const lastname = form_lastname.value;
	const firstname = form_firstname.value;
	const id = 'ID' + Date.now();
	const email = form_email.value;
	const phone = form_phone.value;
	const is_active = form_status.checked;
	const link = form_link.value;

	let new_contact;

	let type_of_contact = form_contact_pro;
	if (type_of_contact.checked == false)
		type_of_contact = form_contact_perso;

	if (form_lastname.value != '' && form_firstname.value != '' && form_email.value != '' && form_phone.value != '' && form_link.value != '')
	{
		if (type_of_contact.value == 'contact_pro')
			new_contact = new ContactPro(lastname, firstname, id, email, phone, is_active, link);
		else
			new_contact = new ContactPerso(lastname, firstname, id, email, phone, is_active, link);

		form_lastname.value = '';
		form_firstname.value = '';
		form_email.value = '';
		form_phone.value = '';
		form_link.value = '';
		form_status.checked = true;
		form_contact_pro.checked = true;
		form_contact_perso.checked = false;
		form_link.placeholder = 'LinkedIn link';
		form_logo.src = './images/logo_linkedin.png';
		form_logo.alt = 'LinkedIn logo';
		contacts.push(new_contact);
		localStorage.setItem('addressbook', JSON.stringify(contacts));
		form_new_contact.classList.add('hidden');
		display_contact(new_contact);
		p_no_contact.classList.add('hidden');
		last_button = '';
	}
});

