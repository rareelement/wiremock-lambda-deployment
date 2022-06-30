FROM openjdk:11

ARG FUNCTION_DIR="/home/app"
ENV DEBIAN_FRONTEND=noninteractive
ENV WIREMOCK_CONFIG_DIR=${FUNCTION_DIR}/wiremock

# Install NodeJS
RUN apt-get update && \
    apt-get install -y \
        curl && \
    curl -sL https://deb.nodesource.com/setup_14.x  | bash - && \
    apt-get install -y nodejs

RUN apt-get update && \
    apt-get install -y \
        g++ \
        gcc \
        tar \
        curl \
        gzip \
        make \
        cmake \
        autoconf \
        automake \
        libtool \
        wget \
        libcurl4-openssl-dev

RUN mkdir -p ${FUNCTION_DIR}/wiremock
WORKDIR ${FUNCTION_DIR}

RUN npm install aws-lambda-ric --silent --no-lock --production

COPY index.js ${FUNCTION_DIR}
COPY entry.sh ${FUNCTION_DIR}

# see http://wiremock.org/docs/stubbing/
COPY configuration ${FUNCTION_DIR}/wiremock

RUN wget https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/2.33.2/wiremock-jre8-standalone-2.33.2.jar

ENTRYPOINT ["sh", "/home/app/entry.sh"]
