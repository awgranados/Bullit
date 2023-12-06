Design Document
=================

Overview System Architecture Diagram
---------------
![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/2df4f031-a2cc-4e7d-8c9a-c29451c04f37)

Important Team Decisions
---------------
1. Login page: using Firebase Authentication to display information relavant to each respective user and protect their privacy
2. Home page: list information that user would want to see upon opening app: accepted rides as driver or passenger
   ![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/52ad1739-8ca1-4150-aa4e-a0e9f5a34650)

4. Rides page: allow you to search for rides by destination and results are cards with vital information and accept button. Clicking on cards also takes you to a new page for more ride details. Also a Create Ride Offer button to offer ride if driver
   ![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/a83119ae-9d3a-4779-b5c1-d81acea9e6b6)
   ![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/d329b953-8e3d-416b-be57-d5ab15ba8242)

5. Profile page: page where user can add selfie, self introduction, driver rating, and other basic information
6. Navigation Bar: to allow easy navigation between pages
7. Firestore Database: to store various data such as user details, ride offers, ride requests, and accepted rides
  ![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/063e7e8f-0cd9-422e-871d-1bba5dd08fe8)

User Experience Considerations
---------------
1. Create animated logo to make app feel more professional
2. Use UCSB colors to appeal to the users who are UCSB students
3. Use cards within collapsible list to display ride's most relavant information while clicking on card would take user to new page for more details
4. Provide driver details for respective ride to give riders safety reassurance
5. Use of icons in cards and navbar to limit amount of words used so app is more aesthetic and intuitive 
