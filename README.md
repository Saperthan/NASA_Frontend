# NASA_Backend

Frontend: 

git clone https://github.com/Saperthan/NASA_Frontend.git


Backend: 

git clone https://github.com/Saperthan/NASA_Backend.git


Steps 1: 

Make sure that the required packages are installed by doing:

mvn clean install -Dmaven.skip.test=true (on the backend project /clone)

yarn install (on the frontend project/clone)

Step 2:

Start the frontend project by yarn start

Start the backend either by opening the project in Intellij, build and run the Spring Boot Application or 
run this on the command line from the root path on the project: mvn spring-boot:run


The frontend client is running on localhost:3000, and backend server on localhost:8080. If you use different port on the frontend, please make sure to change @Cross-Origin port value to the one you are using on AsteroidController.java

If any questions regarding starting the application, feel free to send me an email to saperthans@gmail.com


Asteroid List page: 

By default it pickups today's date to pick the week, but you can change the date in date picker. 

The data is cached, so if you are loading the same data again it would be much quicker. 



![image](https://user-images.githubusercontent.com/31499924/226210789-f1d7a1f2-b865-4a0c-abaf-95c10d904d0e.png)


Details page: 

![image](https://user-images.githubusercontent.com/31499924/226210894-00704aac-ce59-4924-b05d-37f95f3a1aed.png)



