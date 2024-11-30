FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/target/ms-mensagens-0.0.1-SNAPSHOT.jar ms-mensagens.jar

EXPOSE 3005

ENTRYPOINT ["java", "-jar", "ms-mensagens.jar"]