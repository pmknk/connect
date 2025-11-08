# Content CMS

## Initialize Identity (bootstrap root user)

Use this endpoint to create the initial root/admin user.

```bash
curl -X POST 'http://localhost:4001/api/v1/identity/init' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "root@user.join",
    "password": "OEu+3riZ5E"
  }'
```

Notes:

-   The request body must use the field name `password` (not `pass`).
-   If your server runs on a different port, adjust the URL accordingly.
