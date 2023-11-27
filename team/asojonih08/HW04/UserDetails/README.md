# User Details
### User Details Firestore Collection Structure
![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/f166d179-fbb6-481c-b955-665579a7057a)

The User Details firestore collection will be used to store user details that will be used for:
- personalizing the user's experince when using the app
- to determine what roles the user has
- to share user details with other users when navigating through the app

### When User Creates an Account

When a new user creates an account, the user's first name, last name, email, and date and time the account 
was created on will be stored into an entry (firestore doc) who's doc id will be the user's unique id 
assigned by firebase authentication at account creation. By default, every new user will not be verified
as a driver so the field "verifiedDriver" will be set to false during account creation.

## PR https://github.com/ucsb-cs184-f23/pj-react-02/pull/45)https://github.com/ucsb-cs184-f23/pj-react-02/pull/45 Create User Details Document for New User
### User Creates New Account
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/a1cf8c03-6b3f-4ced-b811-42992c4d23c7" width="200"> <br> <br>
### Entry Added to User Details Collection
<img src="https://github.com/ucsb-cs184-f23/pj-react-02/assets/42366976/4283908e-a36f-46ee-9ebc-35385e664f39" width="600">
