## Hello Georgi,

In this readme file I will be explaining how to run the two apps and what I have done and what I have not done.

---

## How to run the apps

Once the repo is cloned from my GitHub and you are in VS Code:

### Betfinal

1. cd apps/betfinal
2. npm install
3. npm run dev
4. Open localhost in your browser and navigate to the login screen. You can use any of the usernames from the users JSON file. After logging in successfully, you will see an option to deposit and also some bonuses if you are eligible. (KYC is NOT required for Betfinal bonuses)

### Cosmoswin

1. Stop the dev server if it's running
2. cd .. (to move out of betfinal)
3. cd cosmoswin
4. npm install
5. npm run dev
6. Same steps as above. Log in with a valid username. This time, the bonus shop will only show bonuses if the user is KYC-approved (KYC is required for Cosmoswin).

---

## Notes

- I did not translate the UI into Arabic. (Cvetelina mentioned not everything has to be complete, so I figured I would leave that part out.) However, everything else should be working as expected. If not, please let me know and I will improve or rework it.

- Both apps are responsive for mobile devices.

- Bonus and user data are stored in the shared folder to reduce repetition.

- Only client-side rendering is used in both apps.

- The UI for each app is brand-specific:
  - Cosmoswin: purple and cyan, rounded corners, playful look
  - Betfinal: gold and black, no border-radius, minimal and formal

- Bonus eligibility logic is implemented correctly:
  - Brand-based filtering
  - Country check
  - KYC (only for Cosmoswin)
  - Deposit count
  - Registration date
  - Balance must be zero if required

- Users can deposit money using the deposit form. This increases both the deposit count and current balance. Bonus eligibility updates accordingly.

- Users log in by simply entering a username. No password is needed. All user data is mocked.

---

---

## How the deposit feature works

The deposit form allows a logged-in user to simulate adding money to their account.

1. After logging in, you will see a field where you can enter a deposit amount and a button to submit.
2. Submitting a deposit does two things:
   - It increases the user's `currentBalance` by the entered amount.
   - It increments the user's `depositCount` by 1.

This may affect bonus eligibility. For example, if a user had `0` deposits before, they may lose access to a "first deposit bonus" and become eligible for other bonuses.

Note: The deposit data is **not persisted**. It only lives in the app's memory during the session. If you refresh the page or close the tab, the deposit changes will be lost and the user's original data will be loaded again from the `users.json` file.

---

## How to add new bonuses or users

Both bonuses and users are stored in JSON files inside the shared folder at the root of the project.

To add a new user:

1. Go to `packages/shared/data/users.json`
2. Add a new object to the array with the following structure:

```json
{
  "username": "newUser123",
  "depositCount": 0,
  "registrationDate": "2024-12-01T00:00:00.000Z",
  "country": "DE",
  "isKYCApproved": true,
  "currentBalance": 0
}


## System

I am running everything on macOS. If you are using another OS and run into issues, please let me know as I may not be able to test it on your platform.

---

## Final Thoughts

I believe the structure is clear and maintainable. Functionality works as required, and the bonus filtering logic behaves correctly. Let me know if anything needs adjusting.
