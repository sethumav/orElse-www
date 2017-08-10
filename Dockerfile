FROM node:7
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
#RUN ls -la /usr/src/app/*
RUN npm install
EXPOSE 4200
CMD [ "/usr/src/app/node_modules/@angular/cli/bin/ng", "serve", "--host", "0.0.0.0"]
