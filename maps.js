// Google Maps integration for Steady Moving Services

// Initialize the map when the page loads
function initMap() {
  // Los Angeles coordinates
  const losAngeles = { lat: 34.0522, lng: -118.2437 };
  
  // Create a new map centered on Los Angeles
  const map = new google.maps.Map(document.getElementById("serviceAreaMap"), {
    zoom: 10,
    center: losAngeles,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "weight": "2.00"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#9c9c9c"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#f2f2f2"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7b7b7b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c8d7d4"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#070707"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ]
  });
  
  // Add a marker for the company location
  const marker = new google.maps.Marker({
    position: losAngeles,
    map: map,
    title: "Steady Moving Services Headquarters",
    icon: {
      url: "images/logo.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  
  // Add an info window for the marker
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; max-width: 200px;">
        <h3 style="margin-top: 0;">Steady Moving Services</h3>
        <p>123 Moving St, Los Angeles, CA 90001</p>
        <p>(213) 555-7890</p>
        <a href="booking.html" style="color: #FFD700; font-weight: bold;">Get a Quote</a>
      </div>
    `
  });
  
  // Open info window when marker is clicked
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
  
  // Add a circle to represent the service area (30 mile radius)
  const serviceArea = new google.maps.Circle({
    strokeColor: "#FFD700",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFD700",
    fillOpacity: 0.1,
    map: map,
    center: losAngeles,
    radius: 48280, // 30 miles in meters
  });
  
  // Add markers for major service areas
  const serviceLocations = [
    { name: "Santa Monica", lat: 34.0195, lng: -118.4912 },
    { name: "Beverly Hills", lat: 34.0736, lng: -118.4004 },
    { name: "Pasadena", lat: 34.1478, lng: -118.1445 },
    { name: "Long Beach", lat: 33.7701, lng: -118.1937 },
    { name: "Glendale", lat: 34.1425, lng: -118.2551 },
    { name: "Burbank", lat: 34.1808, lng: -118.3090 },
    { name: "Malibu", lat: 34.0259, lng: -118.7798 },
    { name: "Anaheim", lat: 33.8366, lng: -117.9143 }
  ];
  
  // Create markers for each service location
  serviceLocations.forEach(location => {
    const locationMarker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#222222",
        fillOpacity: 1,
        strokeColor: "#FFD700",
        strokeWeight: 2
      }
    });
    
    // Add info window for each location
    const locationInfo = new google.maps.InfoWindow({
      content: `
        <div style="padding: 5px; max-width: 150px;">
          <h4 style="margin-top: 0;">${location.name}</h4>
          <p>We provide full moving services in this area!</p>
        </div>
      `
    });
    
    // Open info window when location marker is clicked
    locationMarker.addListener("click", () => {
      locationInfo.open(map, locationMarker);
    });
  });
}

// Load the map when the window loads
window.onload = function() {
  // Check if the map container exists
  if (document.getElementById("serviceAreaMap")) {
    // Create a script element to load the Google Maps API
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
    script.async = true;
    script.defer = true;
    
    // In a real implementation, replace YOUR_API_KEY with an actual API key
    // For this demo, we'll use a placeholder that will show a development map
    
    // Add the script to the document
    document.head.appendChild(script);
  }
};

// Fallback function for when Google Maps can't be loaded
function handleMapError() {
  const mapContainer = document.getElementById("serviceAreaMap");
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="text-align: center; padding: 50px 20px; background-color: #f5f5f5; border-radius: 8px;">
        <h3>Service Area</h3>
        <p>Our service area covers Los Angeles and surrounding cities within a 30-mile radius, including:</p>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px;">
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Santa Monica</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Beverly Hills</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Pasadena</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Long Beach</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Glendale</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Burbank</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Malibu</span>
          <span style="background-color: #FFD700; color: #222222; padding: 5px 10px; border-radius: 20px;">Anaheim</span>
        </div>
        <p style="margin-top: 20px;">For service availability in your specific location, please contact us at (213) 555-7890.</p>
      </div>
    `;
  }
}

// Set a timeout to check if the map loaded, and show fallback if not
setTimeout(function() {
  const mapContainer = document.getElementById("serviceAreaMap");
  if (mapContainer && !mapContainer.querySelector("iframe") && !mapContainer.querySelector("canvas")) {
    handleMapError();
  }
}, 3000);
