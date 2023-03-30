# Interview Scheduler

Interview Scheduler is a single page application that allows students to book appointments with mentors.\
This project was built over one week as a project for Lighthouse Labs (LHL). Students were required to build and test React components using Jest and Cypress. The back end was provided by LHL ([Original Repo](https://github.com/lighthouse-labs/scheduler/)).

## Highlights

### Create, Read, Update, Delete Appointments

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/01_view_maps.gif/>

### Integration Testing in Cypress

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/01_view_maps.gif/>

### Regression and Unit Testing in Jest

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/01_view_maps.gif/>

### UI Testing in Storybook (UI)

<img src=https://github.com/Jason-Wall/lhl-midterm/blob/master/documents/01_view_maps.gif/>

## Getting Started

- This project has been tested with node versions 12 and 15. It is strongly uncouraged to run
  `nvm use 12` before starting this application.

### Database

The database for this project is forked from:
[https://github.com/lighthouse-labs/scheduler-api](https://github.com/lighthouse-labs/scheduler-api)

### Dependencies

`npm install` to install the following dependencies:

```js
"dependencies": {
    "axios": "^0.20.0",
    "classnames": "^2.2.6",
    "normalize.css": "^8.0.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "3.4.4"
  },
"devDependencies": {
    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^8.0.1",
    "babel-loader": "8.1.0",
    "prop-types": "^15.8.1",
    "react-test-renderer": "^16.9.0",
    "sass": "^1.53.0"
  }
```

### Running Webpack Development Server

`npm start`

### Running Jest Test Framework

`npm test`

### Running Storybook Visual Testbed

`npm run storybook`
