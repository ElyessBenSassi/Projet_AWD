FROM openjdk:17
EXPOSE 8082
ADD target/Order-ms-0.0.1-SNAPSHOT.jar order-ms.jar
ENTRYPOINT ["java", "-jar", "order-ms.jar"]