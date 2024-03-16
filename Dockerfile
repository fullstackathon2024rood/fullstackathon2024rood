FROM gradle:jdk21

WORKDIR /my-project
COPY backend/ .
RUN ["gradle", "build"]

EXPOSE 8080
ENTRYPOINT ["gradle", "run"]