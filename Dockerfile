FROM node:lts AS development

WORKDIR /workdir/react
COPY package*.json /workdir/react
COPY yarn.lock /workdir/react/yarn.lock
RUN yarn
#RUN npm ci
COPY . /workdir/react
RUN yarn build
#ENV CI=true
#RUN serve -s build
CMD yarn start
#FROM nginx:1.13-alpine

#COPY --from=development /workdir/react/build /usr/share/nginx/html
#COPY --from=development /workdir/react/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3002

# Copy .env file and shell script to container
#WORKDIR /usr/share/nginx/html
#COPY .env.staging .
#COPY .env .
# Start Nginx server
#CMD ["nginx","-g","daemon off;"]

