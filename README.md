## Hello Georgi, In this readme file I will be explaining how to run the two apps and what I have done and what I have not done

So, once the repo is cloned from my github and you are in vscode:

1. cd apps/betfinal.
2. npm install
3. npm run dev
4. open local host in your browser and navigate through the login, afte you click login and see the ui, you will get sent to the login screen. Here you can use any of the usernames in the user data thats in the json file. Once you log in successfuly you will see an option to deposit and also some bonuses if KYC aproved, if not bonus shop will be empty.(KYC only for approved user for cosmoswin)

## cosmoswin

1. cd .. to get out after ending the dev server
2. cd cosmoswin
3. npm install
4. npm run dev and do the same things as in the betfinal app


## some other things to note

I did not translate into Arabic.(Cvetelina mentioned not everything has to be complete so I figured I would leave that part out) However I believe everything else is done as it should be. If not please let me know and I will try and better it or re-work it.
Both apps are responsive for mobile devices
Bonuses and user data are stored in the root. Less reppetition.
Only client side rendering is being used in both apps
I beleive the setup and structure are quite straight forward and easy to maintain and are also structured well.
Bonuses are simulated so the user can clain if KYC policies align and other things align. 


