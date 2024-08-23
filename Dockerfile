# Pull the image from Dockerhub
FROM python:alpine3.19
LABEL maintainer="isaacssolver"

# set up python environment variables
ENV PYTHONNUNBUFFER 1

# update and  install dependencies
COPY ./requirements.txt /requirements.txt
COPY ./app /app
WORKDIR /app

# Expose the port server is running on
EXPOSE 8000

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r /requirements.txt && \
    adduser --disabled-password --no-create-home app

ENV PATH="/py/bin:$PATH"

USER app