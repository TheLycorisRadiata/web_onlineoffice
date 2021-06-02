function Contact(lastname, firstname, id, email, phone, is_active)
{
	this.lastname = lastname;
	this.firstname = firstname;
	this.id = id;
	this.email = email;
	this.phone = phone;
	this.is_active = is_active;

	this.present_contact = function()
	{
		alert(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.`);
	}
}

function ContactPro(lastname, firstname, id, email, phone, is_active, linkedin)
{
	Contact.call(this, lastname, firstname, id, email, phone, is_active);
	this.link = linkedin;

	this.present_contact = function()
	{
		const do_redirect = confirm(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.` + 
			`\r\n\r\n` + 
			`You can also find me on LinkedIn! Click on "OK" to be redirected to my account.`);

		if (do_redirect)
			open(this.link, '_blank');
	}
}

function ContactPerso(lastname, firstname, id, email, phone, is_active, facebook)
{
	Contact.call(this, lastname, firstname, id, email, phone, is_active);
	this.link = facebook;

	this.present_contact = function()
	{
		const do_redirect = confirm(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.` + 
			`\r\n\r\n` + 
			`You can also find me on Facebook! Click on "OK" to be redirected to my account.`);

		if (do_redirect)
			open(this.link, '_blank');
	}
}

