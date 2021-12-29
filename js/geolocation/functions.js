let latitude, longitude;

function display_user_position()
{
    if (!user_position)
    {
        display_latitude.innerText = 'Latitude: 0.';
        display_longitude.innerText = 'Longitude: 0.';
        display_precision.innerText = 'Precision is of 0 meter.';

        latitude = 40.753181;
        longitude = -73.982254;
    }
    else
    {
        display_latitude.innerText = `Latitude: ${user_position.latitude}.`;
        display_longitude.innerText = `Longitude: ${user_position.longitude}.`;
        display_precision.innerText = `Precision is of more or less ${Math.round(user_position.accuracy)} meters.`;

        latitude = user_position.latitude;
        longitude = user_position.longitude;
    }
}

