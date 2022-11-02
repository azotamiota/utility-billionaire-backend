FROM node:slim
WORKDIR /home
COPY package.json .
ENV MONGO_URI="mongodb+srv://the-millionaires:Lap3Project@cluster0.ejb0ecs.mongodb.net/utility-billionaire?retryWrites=true&w=majority"
ENV PORT=5000
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
