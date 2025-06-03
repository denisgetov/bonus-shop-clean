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

## System

I am running everything on macOS. If you are using another OS and run into issues, please let me know as I may not be able to test it on your platform.

---

## Final Thoughts

I believe the structure is clear and maintainable. Functionality works as required, and the bonus filtering logic behaves correctly. Let me know if anything needs adjusting.
