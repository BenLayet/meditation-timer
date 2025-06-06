curl -X POST --location "http://localhost:18000/api/v1/email-verifications" \
    -H "Content-Type: application/json" \
    -d '{
            "email": "email@example.org"
        }'

curl http://localhost:18000/api/v1/email-verifications/verify/{"life":"short","payload":{"uuid":"10000000-0000-1000-8000-000000000002","scope":["VERIFY"]}}
