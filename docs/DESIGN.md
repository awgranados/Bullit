Design Document
=================

Overview System Architecture Diagram
---------------
![image](https://github.com/ucsb-cs184-f23/pj-react-02/assets/57011302/2df4f031-a2cc-4e7d-8c9a-c29451c04f37)

Important Team Decisions
---------------
1. Login page: using Firebase Authentication to display information relavant to each respective user and protect their privacy
2. Home page: list information that user would want to see upon opening app: accepted rides as driver or passenger
3. Rides page: allow you to search for rides by destination and results are cards with vital information and accept button. Also a Create Ride Offer button to offer ride if driver
4. Profile page: page where user can add selfie, self introduction, driver rating, and other basic information
5. Navigation Bar: to allow easy navigation between pages
6. Firestore Database: to store various data such as user details, ride offers, ride requests, and accepted rides

User Experience Considerations
---------------
1. Create animated logo to make app feel more professional
2. Use UCSB colors to appeal to the users who are UCSB students
3. Use cards within collapsible list to display ride's most relavant information while clicking on card would take user to new page for more details
4. Provide driver details for respective ride to give riders safety reassurance
5. Use of icons in cards and navbar to limit amount of words used so app is more aesthetic and intuitive 
