# dubhacks2017

This is a repository for our project for DubHacks 2017


information from running in the future:

AWS EC2 instance
running on default ports 80 (http), 443 (https)
dubbyfoods.ca

npm run build to transpile
run on the server with sudo


Updated instructions:
If you're on Linux, you can run `npm run start` which should clean all lib/ files, .js files, re-transpile, and re-babel your project, then start the server.
feel free to reroute logs
make sure to whitelist your ip address for ssh on the amazon aws dashboard
If you have a private key, ssh with `ssh -i "Gregor.pem" ubuntu@ec2-18-216-75-142.us-east-2.compute.amazonaws.com`
