# teleAid
Designed for people in remote or underserved areas, this telehealth platform helps users find nearby hospitals, send emergency alerts, and switch between English & Hindi for better accessibility.

## MapmyIndia API

This project uses the MapmyIndia API to provide location-based services. Specifically, it generates a link to nearby hospitals based on the latitude and longitude provided by the user. This link is then included in the emergency alert message sent via Twilio.

### How it Works

1. When an emergency alert is triggered, the server receives the latitude and longitude of the patient.
2. The server constructs a URL using the MapmyIndia API to find nearby hospitals.
3. This URL is included in the SMS message sent to the specified phone number.

### Example

For example, if the latitude is `28.6139` and the longitude is `77.2090`, the generated link will be:

```
https://maps.mapmyindia.com/hospitals/near/28.6139,77.2090
```

This link can be opened in a browser to view nearby hospitals on the MapmyIndia platform.

### Configuration

Ensure you have the necessary API keys and environment variables set up for both Twilio and MapmyIndia.

```env
TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
MAPMYINDIA_API_KEY=your_mapmyindia_api_key
```
