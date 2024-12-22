function initMap(x,y) { //given 2 params so that we can call location and location1 later
    //const location = { lat: 6.8046, lng: -58.1553 };
    //const location1 = { lat: 6.808014, lng: -58.162764 };
    const center = { lat: 6.8046, lng: -58.1553 } //GT coordinates

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });
    
    new google.maps.Marker({
        position: x, //param for marker
        map: map,
    });

    new google.maps.Marker({
        position: y, //param for marker
        map: map,
    });
    

    var destination = [x, y];
    var route = new google.maps.Polyline({
        path: destination,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 5

    })
    route.setMap(map) 



}

function plot(){
    const form = document.getElementById("bus-form"); // get information from bus-form id in html
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        const bus_num = document.querySelector('input[name="bus_num"]').value;// Ensure your form has an id like 'bus-form'
    

    fetch(`bus_info?bus_num=${bus_num}`) //get the bus_num and store it in variable
    .then(response => response.json())
    .then(data=>{ //json info will be stored in data object
    const location = {lat:data.start_lat, lng:data.start_long};
    const location1 = { lat: data.stop_lat, lng: data.stop_long }; 

    initMap(location,location1)
    }) 

})
}
// Call plot function after DOM loads
document.addEventListener("DOMContentLoaded", plot);