## About the Website
This website provides a comprehensive view of a Smart Water Grid System, which comprises four underground sumps and four overhead tanks. It displays the water levels of each paired sump and tank, as well as the status of the motors connecting them. The website retrieves this information from AWS DynamoDB, which serves as the central database for all system data. It operates as a server-based website, utilizing backend queries to interact with DynamoDB.

Tools Used:
* React.js
* TypeScript
* AWS DynamoDB
* Next.js

**Sample Screenshots**
<img width="726" alt="Screenshot 2023-05-31 170952" src="https://github.com/mava123-0/rejuven-aqua-website/assets/83857943/7d382740-2db2-4559-ba84-e58481599766">

<img width="726" alt="Screenshot 2023-05-31 170017" src="https://github.com/mava123-0/rejuven-aqua-website/assets/83857943/2bf22cff-1140-48b9-b0cb-5b3cd8d72007">



## Setting Up the Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
