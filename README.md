Welcome to the README file for the Flashwise application built with Next.js!

## What is Flashwise?

Flashwise is a dynamic web application designed to help users learn new things efficiently and effectively. In this repository, you will find only the front-end part of the application, which was built using the Next.js framework. The back-end of the application was developed by @TBury and is not included in this repository.

> This project was created as part of the "Graphic and Object-Oriented programming" course in the 4th semester of computer science studies.

<p align="center">
  <img width="460" src="https://github.com/kacaleksandra/flashwise/assets/49205215/24079a68-84d3-44d2-ad01-92774151b3f3">
</p>

<p align="center">
  <img width="460" src="https://github.com/kacaleksandra/flashwise/assets/49205215/d2aabd82-b249-40ec-918d-f8de6ab9a584">
</p>

<p align="center">
  <img width="460" src="https://github.com/kacaleksandra/flashwise/assets/49205215/6d03cae6-bba6-47ce-aa08-864fe53526f7">
</p>


## Why "flashwise"?

The product name is Flashwise, which was chosen due to the application of the technique of spaced repetition, known as "flashcards," in the learning process. "Wise" pertains to wisdom and intuition, which the app aims to help users acquire through efficient utilization of their own flashcard sets. This name is intended to be easily memorable and to associate with the learning process using flashcards.

## Features
The application offers the following features:
- Adding flashcard sets
- Editing existing sets
- Deleting created flashcard sets
- Browsing flashcard sets by categories
- Learning mode for selected flashcard set
- User registration and login capability
- Flagging sets as private or public
- Generating quizzes and solving them

## Front-end Technologies Used

For the Flashwise project, the front-end of the application was developed using the Next.js framework, which is built upon the popular React library. Next.js provides efficient server-side rendering (SSR) and numerous other advantages, such as easy routing handling and optimized rendering of dynamic content, like images.

To streamline form management on the front-end, the Formik and Yup libraries were used. Formik offers a set of tools for handling forms, including state management, validation, and event handling. Meanwhile, Yup is a validation schema library that simplifies and facilitates form validation.

To incorporate animated Lottie animations on the page, the Lottie-react library was chosen. This tool facilitates the integration and management of Lottie animations, adding interactivity and visual appeal to the user interface of the Flashwise application.

To craft the user interface (UI), a variety of component libraries were utilized: Material-ui, Flowbite, and components prepared by Tailwind. The Material-UI library provides pre-designed components adhering to Material Design principles, allowing for the creation of a consistent and visually appealing application layout. On the other hand, component suggestions from Tailwind CSS and Flowbite provide flexible tools for swiftly building interfaces, enabling customization of the application's appearance and style to individual needs.

For styling the application, the Tailwind CSS framework was used. Tailwind is a CSS utility that offers an extensive collection of ready-made classes for fast and efficient user interface styling. With its simplicity and flexibility, Tailwind CSS enables the creation of an attractive appearance for the Flashwise application while maintaining scalability and ease of style maintenance.

To manage global state in the Flashwise application, the Zustand library was selected. Zustand is a lightweight state management library that provides a simple interface and efficient solutions. It enables the definition of global states accessible and synchronized across different components. With Zustand, effective management of global state, data storage, and responsive handling of state changes is possible in an intuitive and efficient manner. This solution introduces consistency and accessibility to the state throughout the application, facilitating smooth interactions and synchronization between different components.

## How to open this project?

The content of this repository consists of the source files for the front-end part of the Flashwise application. To run the application locally, you need to download or clone this repository, install the dependencies, and start the development server.

You also need to set the environment variable `NEXT_PUBLIC_API_URL` to the URL
of [the back-end server](https://github.com/bartekpacia/flashwise). Put it in
`.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Authors

Aleksandra Kacprzak (front-end) and Tomasz Bury (back-end)
June 2023
