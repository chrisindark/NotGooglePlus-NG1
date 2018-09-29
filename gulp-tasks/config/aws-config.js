module.exports = {
    "production": {
        "accessKeyId": "12345678",
        "secretAccessKey": "12345678",
        "region": "us-east-1",
        "params": {
            "Bucket": "notgoogleplus-static"
        },
        "signatureVersion": "v3",
        "sslEnabled": false,
        "endpoint": "http://127.0.0.1:4567",
        "s3ForcePathStyle": true
    },
    "productionHeaders": {
        "Cache-Control": "max-age=315360000, no-transform, public"
    }
};
