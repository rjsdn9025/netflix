# Step 1: Use an official Node.js image as a base image
FROM node:18-alpine

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Expose the port your application will run on
EXPOSE 5000

# Step 7: Command to run the app
CMD ["node", "server.js"]
