const btn_position_locate = document.getElementById('btn_position_locate');
const btn_position_delete = document.getElementById('btn_position_delete');
const display_latitude = document.getElementById('geolocation_latitude');
const display_longitude = document.getElementById('geolocation_longitude');
const display_precision = document.getElementById('geolocation_precision');

let user_position = JSON.parse(localStorage.getItem('position'));

display_user_position();

btn_position_delete.addEventListener('click', function()
{
    if (user_position)
    {
        user_position = null;
        localStorage.removeItem('position');
        alert('Position deleted.');
        display_user_position();
    }
    else
    {
        alert('There is no position in memory.');
    }
});

/* Allow the user to ask for their position even if it's already known, because the user may go to another location, for instance with a laptop. */
btn_position_locate.addEventListener('click', function()
{
    const options =
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos)
    {
        const position =
        {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy
        }

        localStorage.setItem('position', JSON.stringify(user_position = position));
        display_user_position();
    }

    function error(err)
    {
        console.warn(`ERROR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
});

