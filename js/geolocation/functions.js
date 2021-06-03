function display_user_position()
{
	if (user_position == null)
	{
		display_latitude.innerText = 'Latitude: 0.';
		display_longitude.innerText = 'Longitude: 0.';
		display_precision.innerText = 'Precision is of more or less 0 meter.';

		/*document.querySelector('iframe').src = 'https://maps.google.com/maps?q=40.753181,-73.982254&z=17&output=embed';*/
	}
	else
	{
		display_latitude.innerText = `Latitude: ${user_position.latitude}.`;
		display_longitude.innerText = `Longitude: ${user_position.longitude}.`;
		display_precision.innerText = `Precision is of more or less ${user_position.accuracy} meters.`;

		/*document.querySelector('iframe').src = `https://maps.google.com/maps?q=${user_position.latitude}, ${user_position.longitude}&z=17&output=embed`;*/
	}
}

