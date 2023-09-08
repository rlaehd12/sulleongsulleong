# pull official base image
FROM python:3.9.13-slim

# set work directory
WORKDIR /usr/src/app


# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .

RUN apt-get update && \
apt-get -y install build-essential
RUN pip install -r requirements.txt

# copy project
COPY . .

EXPOSE 8000

# CMD ["python", "manage.py", "runserver"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
