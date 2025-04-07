FROM openjdk:17
EXPOSE 8080
ADD target/ApiGateway-0.0.1-SNAPSHOT.jar api-gateway.jar
ENTRYPOINT ["java", "-jar", "api-gateway.jar"]