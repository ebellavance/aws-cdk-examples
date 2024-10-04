# Static Website
Deploy a static website using Cloudfront, S3 and Certificate. Certificate validation using DNS. A custom resource is used to do the cross account DNS validation.

This example use 3 accounts:
- DNS account
- DEV account
- PROD account

## Before deploying
- Create a role in your DNS account who will be assumed by lambda functions of custom resources. I prefered doing only a role rather than boostrapping the DNS account.
- Update the constants.ts file with your informations before deploying

## Permission needed for the role in the DNS account
Adjust the permission for your needs if you want a more restricitve one.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "route53:ChangeResourceRecordSets",
                "route53:ListHostedZones",
                "route53:ListHostedZonesByName"
            ],
            "Resource": "*"
        }
    ]
}
```

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "arn:aws:iam::111111111111:root",
                    "arn:aws:iam::222222222222:root"
                ]
            },
            "Action": "sts:AssumeRole",
            "Condition": {}
        }
    ]
}
```

### dnscertificatevalidation
AWS Lambda function that manages SSL/TLS certificates using Amazon Certificate Manager (ACM) and Amazon Route 53.

**Imports:**
The code starts by importing necessary modules from AWS SDK v3 for interacting with ACM, Route 53, and STS (Security Token Service).

**Interface Definitions:**
It defines TypeScript interfaces for ResourceProperties and Event, which structure the input data for the Lambda function.

**Main Functions:**
- **requestCertificate:**
Requests a new SSL/TLS certificate from ACM.

- **waitForCertificateValidation:**
Polls the ACM service to check if a certificate has been issued.

- **assumeCrossAccountRole:**
Assumes an IAM role in another AWS account to access Route 53.

**Lambda Handler:**
The exports.handler function is the main entry point for the Lambda. It handles three types of events:

- **Create:**
Requests a new certificate
Creates DNS validation records in Route 53
Waits for the certificate to be issued

- **Update:**
Checks if the domain or alternative names have changed.
If changed, requests a new certificate and deletes the old one
Updates DNS validation records
Waits for the new certificate to be issued

- **Delete:**
Deletes the specified certificate

**Certificate Validation Process:**
After requesting a certificate, it fetches the validation records from ACM
It then finds the correct Route 53 hosted zone for each domain
Creates or updates CNAME records in Route 53 for domain validation
Waits for the certificate to be fully validated and issued

**Error Handling:**
The code includes try-catch blocks to handle and log errors during the process.

