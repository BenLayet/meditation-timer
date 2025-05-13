curl -X POST --location "http://localhost:18000/api/v1/email-activations" \
    -H "Content-Type: application/json" \
    -H "Cookie: deviceUuid=11111111-0000-1000-8000-000000000001" \
    -d '{
            "email": "meditation-timer-test@maildrop.cc"
        }'