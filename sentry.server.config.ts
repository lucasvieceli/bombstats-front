// // This file configures the initialization of Sentry on the server.
// // The config you add here will be used whenever the server handles a request.
// // https://docs.sentry.io/platforms/javascript/guides/nextjs/

// import * as Sentry from "@sentry/nextjs";
// if (process.env.NODE_ENV !== "development") {
//   Sentry.init({
//     dsn: "https://7895ba368d64e3e7a949186498128246@o4507549660741632.ingest.us.sentry.io/4507549661790208",

//     // Adjust this value in production, or use tracesSampler for greater control
//     tracesSampleRate: 1,

//     // Setting this option to true will print useful information to the console while you're setting up Sentry.
//     debug: false,

//     // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
//     // spotlight: process.env.NODE_ENV === 'development',
//   });
// }
