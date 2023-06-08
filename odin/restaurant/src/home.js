export default function home(component){
    component.innerHTML = '';

    var header = document.createElement('h1');
    header.textContent = 'Restaurant Name';
    header.classList.add('page-block');
    component.appendChild(header);

    var description = document.createElement('div');
    description.textContent = 'por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e';
    description.classList.add('page-block');
    component.appendChild(description);

    var hours = document.createElement('div');
    hours.classList.add('page-block');
    var hoursTitle = document.createElement('h2');
    hoursTitle.textContent = 'Hours';
    var p1 = document.createElement('p');
    p1.textContent = 'Sunday: 8am - 8pm';
    var p2 = document.createElement('p');
    p2.textContent = 'Monday: 6am - 6pm';
    var p3 = document.createElement('p');
    p3.textContent = 'Tuesday: 6am - 6pm';
    var p4 = document.createElement('p');
    p4.textContent = 'Wednesday: 6am - 6pm';
    var p5 = document.createElement('p');
    p5.textContent = 'Thursday: 6am - 10pm';
    var p6 = document.createElement('p');
    p6.textContent = 'Friday: 6am - 10pm';
    var p7 = document.createElement('p');
    p7.textContent = 'Saturday: 8am - 10pm';
    hours.appendChild(hoursTitle);
    hours.appendChild(p1);
    hours.appendChild(p2);
    hours.appendChild(p3);
    hours.appendChild(p4);
    hours.appendChild(p5);
    hours.appendChild(p6);
    hours.appendChild(p7);
    component.appendChild(hours);

    var location = document.createElement('div');
    location.classList.add('page-block');
    var locationTitle = document.createElement('h2');
    locationTitle.textContent = 'Location';
    var locationText = document.createElement('p');
    locationText.textContent = '123 road, Country';
    location.appendChild(locationTitle);
    location.appendChild(locationText);
    component.appendChild(location);
}