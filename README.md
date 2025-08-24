# Hotel Management Project

This application uses **React TypeScript**, **PocketBase**, **TanStack Router**, **TanStack Query**, **React Redux**, **ShadCN**, **Zod**, and **Tailwind CSS**.

## Steps to set up and run the application

Copy the github repository url and run the following commands on the command line. 

```bash
git clone https://github.com/Dulangikarunasekara/management-project.git
```

# To Set up the Pocketbase Server

Navigate into the folder with the pocketbase executable

```bash
cd management-project/server/pb
```

Run the following in the command line tool 
```bash
pocketbase serve
```

Pocketbase will run at http://127.0.0.1:8090.

# To set up the frontend 
Make sure  pocketbase is running. 

Navigate into the project folder with the frontend files:
```bash
cd management-project/client
```

Install dependencies:
```bash
npm install
```

to run the frontend application type the following in the terminal:
```bash
npm run dev
```
