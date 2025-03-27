curl -X POST --location "http://localhost:8000/api/v1/meditations" \
    -H "Content-Type: application/json" \
    -H "Cookie: device_uuid=00000000-0000-0000-0000-000000000001" \
    -d '{
          "startedTimeInSeconds": 1742997126,
          "durationInMinutes": 20
        }'

curl -X GET --location "http://localhost:8000/api/v1/meditations/statistics" \
    -H "Cookie: device_uuid=00000000-0000-0000-0000-000000000001"