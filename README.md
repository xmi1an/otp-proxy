# Integrating with the OTP Service API using PHP

This guide demonstrates how to use the OTP Service API to send and verify OTPs from a PHP application, including handling responses based on the API's expected structure.

## Prerequisites
- A PHP environment set up
- cURL installed and enabled in PHP

## Sending an OTP
To send an OTP to a phone number, make a POST request to the `/send-otp` endpoint with the `phone_number` in the request body.

### PHP Example
```php
<?php
$apiUrl = 'https://xmi1an-otp-proxy.vercel.app/api/send-otp';
$phone_number = '+919876543212'; // Replace with the recipient's phone number
$data = ['phone_number' => $phone_number];
$options = [
    'http' => [
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data),
    ],
];
$context = stream_context_create($options);
$result = file_get_contents($apiUrl, false, $context);
if ($result === FALSE) {
    echo "Error sending OTP";
} else {
    $responseData = json_decode($result, true);
    if ($responseData['status']) {
        echo "Success: " . $responseData['message'];
    } else {
        echo "Failure: " . $responseData['message'];
    }
}
?>
```

### Expected Response
A successful OTP send request will return:
```json
{
    "status": true,
    "message": "OTP has been sent to your Phone Number"
}
```

## Verifying an OTP
To verify an OTP, send a POST request to the `/verify-otp` endpoint with both `phone_number` and `otp` included in the request body.

### PHP Example
```php
<?php
$apiUrl = 'https://xmi1an-otp-proxy.vercel.app/api/verify-otp';
$phone_number = '919876543212'; // Replace with the phone number used for the OTP
$otp = '123456'; // Replace with the OTP received
$data = [
    'phone_number' => $phone_number,
    'otp' => $otp,
];
$options = [
    'http' => [
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data),
    ],
];
$context = stream_context_create($options);
$result = file_get_contents($apiUrl, false, $context);
if ($result === FALSE) {
    echo "Error verifying OTP";
} else {
    $responseData = json_decode($result, true);
    if ($responseData['status']) {
        echo "Success: " . $responseData['message'] . ", Created by: " . $responseData['created_by'];
    } else {
        echo "Failure: " . $responseData['message'];
    }
}
?>
```

### Expected Response
A successful OTP verification request will return:
```json
{
    "status": true,
    "message": "OTP verified Successfully",
    "created_by": "xmi1an"
}
```

## Notes
- Ensure to handle the `$responseData` array appropriately by checking the `status` field to determine success or failure.
- Adjust the phone number and OTP values to suit your testing environment.
- Always implement error handling in production code, especially for network and server errors.
