
# BuildAura

Welcome to BuildAura, a comprehensive Building Management System (BMS) designed to streamline the management of a single building. Our platform caters to not only user and admin functionalities but also member functionalities, ensuring a seamless experience for all stakeholders.

<!-- ## Admin Credentials

- **Admin Email**: maharunnessa12@gmail.com
- **Password**: Maharun123 -->

## Live Site URL

[Visit BuildAura](https://buildaura-e28d5.web.app/)

## Server Side Github Link

https://github.com/preetu10/build-aura-server

## Used Tools

- React JS
- Tailwind CSS
- Express
- Firebase
- MongoDB
- Stripe

## Features

1. **Responsive Design**: BuildAura is fully responsive, ensuring optimal user experience across mobile, tablet, and desktop devices, including the dashboard.
2. **User and Member Dashboards**: Separate dashboards for users and members, each with tailored features and functionalities.
3. **Dynamic Navbar**: Displays user profile picture upon login with a dropdown menu for easy navigation to the dashboard and logout options.
4. **Fancy Banner**: A beautiful banner with automatic slides showcasing images of the building or apartments.
5. **Detailed Information Sections**: Sections for building details, apartment locations with maps, and an elegant about section.
6. **Coupon Display**: A visually appealing section for displaying available coupons on the home page only for logged in users.
7. **Apartment Listings**: All of apartments with images, floor number, block name, apartment number, rent, and other information are provided in Apartments page.
8. **Agreement Requests**: Users can apply for an apartment agreement, with the data being stored and managed efficiently. When user requests for an apartment the apartment will be shown as unavailable. One user can request for only one apartment or can take rent only one apartment at a time. If he/she requests for more than one apartment or request for apartment in spite of being a member(i.e already took an apartment on rent), then he/she will get a warning instantly and won't be allowed to request.
9. **Admin Controls**: Admin can manage members, make announcements, handle agreement requests, and manage coupons from a dedicated admin dashboard. Admin can delete a member's membership and make him/her a normal user. It will happen in the case if the member handovers the apartment back to owner. On deleting membership of the user, the apartment he/she took on rent will be made available.Admin can make announcements and all the announcements are shown in the Announcements page(private route) where recent announcements are shown first. Admin can also create new coupons and also make them available or unavailable according to his/her convenience. Whenever a user requests for apartments, it will come to admin and he can either accept or reject it.
10. **Secure Payment System**: Members can make payments, apply coupons, and view their payment history with a search functionality based on the month. There is a fantastic feature implemented here too and that is if user can make payment for sequential months. Suppose a user has took rent on the month  June, then he needs to pay from July. If he wants to pay for month April or September, he will be warned in both cases. He cannot pay for the month when he was not a member(i.e took apartment on rent) also not before paying the due month's payment.


