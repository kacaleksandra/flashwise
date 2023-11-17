Welcome to the README file for the Flashwise application built with Next.js!

## What is Flashwise?

Flashwise is a dynamic web application designed to help users learn new things efficiently and effectively. In this repository, you will find only the front-end part of the application, which was built using the Next.js framework. The back-end of the application was developed by @TBury and is not included in this repository.

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

## Front-end Technologies & Libraries Used

- Next.js,
- Formik & Yup
- Lottie-react
- Material-UI & Flowbite & Tailwind components
- Tailwind CSS
- Zustand

## How to open this project?

The content of this repository consists of the source files for the front-end part of the Flashwise application. To run the application locally, you need to download or clone this repository, install the dependencies, and start the development server.

You also need to set the environment variable `NEXT_PUBLIC_API_URL` to the URL
of [the back-end server](https://github.com/bartekpacia/flashwise). Put it in
`.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Back-end docs

You can find the back-end documentation below:
https://kacaleksandra.notion.site/The-flashwise-back-end-docs-bef70c79e8e44a3481222c9ccd38a5dd?pvs=4

## Authors

Aleksandra Kacprzak (front-end) and Bartek Pacia (back-end)
