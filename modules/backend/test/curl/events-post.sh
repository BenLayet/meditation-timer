curl -X POST --location "http://localhost:8000/api/v1/events" \
    -H "Content-Type: application/json" \
    -H "Cookie: userUuid=11111111-0000-1000-8000-000000000001" \
    -d '{
            "uuid": "11111111-0000-1000-8000-000000120003",
            "type": "ADD_MEDITATION",
            "payload": {
                "uuid": "11111111-0000-1000-8000-000000000003",
                "durationInSeconds": 300,
                "startedTimestampInSeconds": 1699999999999
            }
        }'