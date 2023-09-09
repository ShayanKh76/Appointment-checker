
This is a Node.js script that automates the process of booking an appointment on the IT-IR Visa Appointment website using Puppeteer. It also interacts with Google Apps Script web apps for various purposes.

## Prerequisites
Before using this script, make sure you have the following dependencies installed:

- Node.js
- Puppeteer
- readline
- play-sound
- axios


You'll also need to have a running instance of the Google Chrome browser with the remote debugging port enabled. You can do this by launching Chrome with the --remote-debugging-port=9222 flag.

## Configuration
Edit the following variables at the beginning of the script to configure it according to your needs:

- chatId: Your Telegram ID.
- userDate: The desired payment date in the format "YYYY/MM/DD".
- webAppUrlClose: URL of the Google Apps Script web app used to close the appointment process.
- webAppUrlOpen: URL of the Google Apps Script web app used to open the appointment process.
- webAppUrlCallForHelp: URL of the Google Apps Script web app used to call for help.

## Usage

1. Install the required dependencies using npm install.

2. Ensure that Google Chrome is running with remote debugging enabled on port 9222.

3. Run the script using node script.js.

4. The script will automate the appointment booking process on the IT-IR Visa Appointment website. It will select options, input dates, and interact with the page as needed to book an appointment.

5. If the appointment is successfully booked, it will play an alert sound and send a request to the Google Apps Script web app specified in webAppUrlOpen.

6. If any error occurs during the process, it will retry and eventually call for help by sending a request to the Google Apps Script web app specified in webAppUrlCallForHelp.

7. You can monitor the script's progress in the console.

## Important Notes


- This script is provided as-is and may require adjustments based on website changes or specific requirements.

- Be cautious when automating web interactions to avoid violating the website's terms of service.

- Ensure that you have the necessary permissions and access to the Google Apps Script web apps used by this script.

- Customize error handling and recovery strategies as needed for your use case.

- Keep the script running in a stable environment for the best results.

- The script assumes that Google Chrome is running locally with remote debugging enabled on port 9222. Adjust the browserURL variable if needed.

- It's recommended to test the script thoroughly in a controlled environment before using it for critical tasks.

- Always respect the website's terms of use and policies while using this automation script.

## License

This script is provided under the MIT License. Use it at your own risk.
