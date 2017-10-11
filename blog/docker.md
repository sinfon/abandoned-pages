# Docker

----------------------------------------------------------------------------------

- [参考](#参考)
- [1. 安装](#一安装安装)
- [2. 容器](#2.容器)

----------------------------------------------------------------------------------

## 参考

- [Get Started](https://docs.docker.com/get-started/)

----------------------------------------------------------------------------------

## 一、安装（安装）

> 1. 安装

- [Install Docker](https://docs.docker.com/engine/installation/)

### 1.1. Install DOCKER CE - CentOS

#### 1.1.1. Install

```
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
$ sudo yum-config-manager --enable docker-ce-edge
$ sudo yum-config-manager --enable docker-ce-test
$ sudo yum install docker-ce
```

- If wanna install a specific version

```
$ yum list docker-ce.x86_64  --showduplicates | sort -r
$ sudo yum install <FULLY-QUALIFIED-PACKAGE-NAME>
```

> Find `FULLY-QUALIFIED-PACKAGE-NAME` via first `yum list` command

> e.g. `sudo yum install docker-ce-17.06.2.ce-1.el7.centos.x86_64`

#### 1.1.2. Start

```
$ sudo systemctl start docker
```

#### 1.1.3. Test

```
$ sudo docker run hello-world
Hello from Docker!
...

$ docker --version
Docker version 17.09.0-ce-rc1, build ae21824
```

----------------------------------------------------------------------------------

## 2. 容器

> 2. 容器

- [Define a container with a Dockerfile](https://docs.docker.com/get-started/part2/#define-a-container-with-a-dockerfile)

### 2.1. 准备

```
$ mkdir testDocker
$ cd testDocker/
```

- 新建文件 `Dockerfile` 文件内容如下

```
# Use an official Python runtime as a parent image
FROM python:2.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

- 新建文件 `app.py` 文件内容如下

```
from flask import Flask
from redis import Redis, RedisError
import os
import socket

# Connect to Redis
redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)

@app.route("/")
def hello():
    try:
        visits = redis.incr("counter")
    except RedisError:
        visits = "<i>cannot connect to Redis, counter disabled</i>"

    html = "<h3>Hello {name}!</h3>" \
           "<b>Hostname:</b> {hostname}<br/>" \
           "<b>Visits:</b> {visits}"
    return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
```

- 新建文件 `requirement.txt` 文件内容如下

```
Flask
Redis
```

Now we see that pip install -r requirements.txt installs the Flask and Redis libraries for Python, 
and the app prints the environment variable NAME, as well as the output of a call to socket.gethostname(). 
Finally, because Redis isn’t running (as we’ve only installed the Python library, and not Redis itself), 
we should expect that the attempt to use it here will fail and produce the error message.

Note: Accessing the name of the host when inside a container retrieves the container ID, 
which is like the process ID for a running executable.

That’s it! You don’t need Python or anything in requirements.txt on your system, 
nor will building or running this image install them on your system. 
It doesn’t seem like you’ve really set up an environment with Python and Flask, but you have.

### 2.2. 构建

```
$ sudo docker build -t friendlyhello .
$ sudo docker images
$ sudo docker run -p 20085:80 friendlyhello
```

- Visit http://localhost:20085 or `curl http://localhost:20085`

```
$ sudo docker run -d -p 20085:80 friendlyhello
$ sudo docker container ls
$ sudo docker stop <CONTAINER ID>
```
