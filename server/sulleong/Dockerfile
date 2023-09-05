FROM adoptopenjdk/openjdk11
COPY src/main/resources/.env src/main/resources/.env
ARG JAR_FILE_PATH=build/libs/*.jar
COPY ${JAR_FILE_PATH} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]