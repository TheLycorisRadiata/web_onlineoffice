class Contact
{
	constructor(lastname, firstname, id, email, phone, is_active)
	{
		this.lastname = lastname;
		this.firstname = firstname;
		this.id = id;
		this.email = email;
		this.phone = phone;
		this.is_active = is_active;
	}

	present_contact()
	{
		alert(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.`);
	}
}

class ContactPro extends Contact
{
	constructor(lastname, firstname, id, email, phone, is_active, linkedin)
	{
		super(lastname, firstname, id, email, phone, is_active);
		this.link = linkedin;
	}

	present_contact()
	{
		const do_redirect = confirm(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.` + 
			`\r\n\r\n` + 
			`You can also find me on LinkedIn! Click on "OK" to be redirected to my account.`);

		if (do_redirect)
			open(this.link, '_blank');
	}
}

class ContactPerso extends Contact
{
	constructor(lastname, firstname, id, email, phone, is_active, facebook)
	{
		super(lastname, firstname, id, email, phone, is_active);
		this.link = facebook;
	}

	present_contact()
	{
		const do_redirect = confirm(`Hello! My name is ${this.firstname} ${this.lastname}. You can contact me at ${this.email} or on ${this.phone}.` + 
			`\r\n\r\n` + 
			`You can also find me on Facebook! Click on "OK" to be redirected to my account.`);

		if (do_redirect)
			open(this.link, '_blank');
	}
}

