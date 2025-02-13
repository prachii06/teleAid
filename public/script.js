document.addEventListener("DOMContentLoaded", () => {
    const getLocationBtn = document.getElementById("getLocation");
    const sendAlertBtn = document.getElementById("sendAlert");
    const locationText = document.getElementById("locationText");
    
    let latitude, longitude;
  
    // 📌 Get User Location & Open Map
    getLocationBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
  
            locationText.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;
  
            // Open MapmyIndia link directly
            const mapLink = `https://maps.mapmyindia.com/hospitals/near-me`;
            window.open(mapLink, "_blank");
          },
          () => alert("Failed to get location.")
        );
      } else {
        alert("Geolocation not supported.");
      }
    });
  
    // 📌 Send Emergency Alert via Twilio
    sendAlertBtn.addEventListener("click", async () => {
      if (!latitude || !longitude) {
        alert("Please get your location first!");
        return;
      }

      try {
        const phoneNumber = prompt("Enter Emergency Contact Number:");
        if (!phoneNumber) return;
  
        const response = await fetch("/send-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude, phoneNumber }),
        });
  
        const result = await response.json();
        if (result.success) {
          alert("🚨 Emergency alert sent!");
        } else {
          alert("Failed to send alert.");
        }
      } catch (error) {
        alert("Error sending alert.");
        console.error(error);
      }
    });
  });
  