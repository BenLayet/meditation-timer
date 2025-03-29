curl -X POST --location "http://localhost:8000/api/v1/devices" \
    -H "Content-Type: application/json" \
    -H "Cookie: userUuid=11111111-0000-1000-8000-000000000001" \
    -d '{
          "uuid": "22222222-0000-1000-8000-000000000001"
        }'