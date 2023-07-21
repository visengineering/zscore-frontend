# ZscoreFrontend

## Run project locally

1. If nvm is not installed then install it using the commands listed on the NVM Readme on GitHub `https://github.com/nvm-sh/nvm#installing-and-updating`, otherwise skip to -

2. Install npm using the command `nvm install v18.14.0`

3. Clone the frontend repository using the command `git clone git@github.com:sagaci/universe-frontend.git`.

4. cd into the project folder and run `npm install` to install dependencies.

5. Update environment.development file with your desire env variables

6. Run `ng serve` for a dev server.

7. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build and deploy

1. SSH into your server

2. Install git by running following command
    1. `sudo apt update`
    2. `sudo apt install git`

3. Follow steps that are mentioned for local setup from step 1-4

4. On your local project run the command to build the application `npm run build`.

5. Run the following command to install nginx
    1. `sudo -s - for super user`
    2. `sudo apt update - to update the existing packages`
    3. `sudo apt install nginx - to install the nginx web server`

6. After installing nginx, Run the following command
    1. cp ./nginx.conf /etc/nginx/sites-enabled/default

7. Run the following the command
    1. `sudo service nginx restart`
