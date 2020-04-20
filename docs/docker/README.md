# particula-docker-compose

# Particula UML

![](assets/uml-project.png)

# TODO 

Issues on Redmine.

# TUTORIAL

## What is Docker?

Docker contains your code.

The Docker files in the frontend & backend project are the building blocks for the `docker-compose`.

With `docker-compose` we load the Docker files, which installs the required packages & services we need to run the code.

## Installing Docker

### On linux

```
sudo apt-get install docker
sudo apt-get install docker-compose
```

### On Windows

You need to get the docker toolbox. `https://github.com/docker/toolbox/releases`

Get the latest `.exe` version for the toolbox.

![](assets/docker-toolbox-install.JPG)

You can run the `Docker Quickstart Terminal` to use the Docker environment.

![](assets/docker-quickstart-terminal.PNG)

Run the terminal and wait a couple of moments until the terminal is open and active. You will get a `machine IP`.

![](assets/docker-booted-terminal.PNG)

This IP is very important to connect to your local containers. -> More about this later

## Important Commands:


### To Run the docker-compose file
#### On Linux
```
sudo docker-compose up -d --build
```

#### On Windows
In Docker Quickstart Terminal:
```
docker-compose up -d --build
```

### To check the running containers:
```
docker ps
```

### Killing containers:
```
docker kill 
```

You can use this command to kill 1 container that you select by selecting `container name or container id`

Example:

```
docker kill particula-docker-compose_frontend_1
```

### Killing all containers:
```
docker kill $(docker ps -q)
```

## Connecting to the services

### On Linux

#### For Back-end
In your browser, go to : `localhost:3000`

#### For Grafana
In your browser, go to : `localhost:3001`

#### For Front-end
In your browser, go to : `localhost`


### On Windows

Check your Docker_Toolbox machine IP and in your browser go to: `machineip:port`

#### For Back-end
In your browser, go to : `machineip:8080`

####  For Grafana
In your browser, go to : `machineip:3001`

####  For Front-end
In your browser, go to : `machineip`

# InfluxDB

`https://docs.influxdata.com/influxdb/v1.7/tools/api/`

## Sending data with Postman

To push data to `particulaInfluxDB` with postman create following POST request:

```
POST http://localhost:8086/write?db=particulaInfluxDB&precision=s
```

body

```
sensors,sensor_id=sensor-test humidity=59,pm10=23,pm25=12,temperature=21.5 1581880318
```

## Viewing data with Postman

In case the port is left unchanged (can be checked with docker ps) following is an example to view all data within `sensors`:

```
GET http://localhost:8086/query?db=particulaInfluxDB&q=select * from sensors
```

## Clearing series
To remove all data in a measurement execute following query:
```
DROP SERIES FROM sensors
```

# Docker Image on the Server

You want to create an image through Github Actions.

![](assets/image-creating-1.PNG)

![](assets/image-creating-2.PNG)

![](assets/image-creating-3.PNG)

See the .github folder in the project for an example.

Make sure `pass` is installed on the server before adding your personal github tokens to the server.

Now you want to create a personal github token to load repositories on your server.

Run this command on your server:
```
 docker login -u USERNAME docker.pkg.github.com
 -> ACCESTOKEN
```
