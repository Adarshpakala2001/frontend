# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the contents of the frontend directory into the container at /app/
COPY . .

# Install any needed packages specified in package.json
RUN npm install
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the React app when the container launches
CMD ["npm", "start"]
