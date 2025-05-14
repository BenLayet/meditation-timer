curl -X POST --location "http://localhost:18000/api/v1/email-activations" \
    -H "Content-Type: application/json" \
    -d '{
            "email": "email@example.org"
        }'