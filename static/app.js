function initMap() {
    const center = { lat: 6.8046, lng: -58.1553 }; // GT coordinates

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });

    const directionService = new google.maps.DirectionsService(); // Calculate route between locations
    const renderDirections = new google.maps.DirectionsRenderer(); // Display route on map
    renderDirections.setMap(map);

    function directions(x, y) {
        const waypoint = {
            origin: x,
            destination: y,
            travelMode: 'DRIVING'
        }; // Required parameters given by Google Directions API website

        directionService.route(waypoint, (response, status) => {
            if (status === "OK") {
                renderDirections.setDirections(response);
            } else {
                console.error("No direction", status);
            }
        });
    }

    function plot() {
        const form = document.getElementById("bus-form"); // Get information from bus-form id in HTML
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission
            const bus_num = document.querySelector('input[name="bus_num"]').value; // Ensure your form has an id like 'bus-form'

            fetch(`bus_info?bus_num=${bus_num}`) // Get the bus_num and store it in variable
                .then(response => response.json())
                .then(data => { // JSON info will be stored in data object
                    const location = { lat: data.start_lat, lng: data.start_long };
                    const location1 = { lat: data.stop_lat, lng: data.stop_long };

                    directions(location, location1);
                });
        });
    }

    // Call plot function after DOM loads
    plot()
}
