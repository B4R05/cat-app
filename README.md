### Live Demo

https://cat-app-cf3cc.web.app/

### Running locally

#### `git clone repo name`

to clone the app locally

#### `npm install`

to install all the required packages

#### `npm start`

Before you run this command ensure you have the right `REACT_APP_API_KEY` (use your own or get in touch) in the local `.env` file to run the app on locally.

### Features

- prompted to navigate to '/upload' if there are no images to load
- mobile, tablet, large screen responsiveness
- only images allowed as client-side upload validation
- during upload, navigation away from '/upload' is blocked by a prompt
- caching, if user goes back to '/' without uploading, cats not fetched again, cache cleared on only success, on failure cache not cleared

### Notes

There are many things that could have been done given enough time but I left this to just the basics

- add placeholder in images until they load fully (with onLoad logic)
- lazy load more images on scroll or via button
- if the app was heavy, I would lazy load pages / components based on routes
- rate limiting / debouncer for up and down votes + favourite
- compress images with image compression service
- little safety measures were added in case of errors in fetching arrays for array merging
- API KEY: it is a bad practice to put in env file and it is better to fetch that from the backend but here is just an example
