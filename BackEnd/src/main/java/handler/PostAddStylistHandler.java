package handler;

import io.javalin.core.validation.JavalinValidation;
import io.javalin.core.validation.Validator;
import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.UploadedFile;
import io.javalin.plugin.json.JavalinJackson;
import modal.User;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import org.mindrot.jbcrypt.BCrypt;
import repository.AwsUploadImage;
import repository.JWT;
import repository.UserRepository;
import request.AuthRequest;
import request.ErrorRequest;

import java.sql.SQLException;

public class PostAddStylistHandler implements Handler {
    UserRepository repository;
    JWT jwt = new JWT();

    public PostAddStylistHandler(UserRepository repository) {
        this.repository = repository;
    }


    @Override
    public void handle(@NotNull Context context) throws Exception {
        User user = generateUser(new JavalinJackson(), context);

        AuthRequest authRequest = new AuthRequest();
        ErrorRequest errorRequest = new ErrorRequest();

        try {
            if (user != null) {
                repository.addStylist(user);
            } else {
                throw new Exception("Empty request sent");
            }
            authRequest.setToken(jwt.generateJWT(String.valueOf(user.getId()), user.getEmail(), 14444444));
            context.res.setStatus(200);
            context.res.setHeader("X-token", authRequest.getToken());
            context.json(authRequest);
        } catch (SQLException e) {
            if (e.getMessage().contains("ERROR: duplicate key value violates unique constraint \"username_unique\"\n")) {
                context.res.setStatus(HttpStatus.FORBIDDEN_403);
                errorRequest.setError("User with this email already exist");
                context.res.getOutputStream().print("User with this username already exists");
                context.json(errorRequest);
            } else {
                System.out.println("add stylist" + e.getMessage());
                context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
                context.res.getOutputStream().print("Database error happened");

            }
            context.res.getOutputStream().close();
        } catch (Exception e) {
            if (e.getMessage().contains("Email is not valid")) {
                context.res.setStatus(HttpStatus.NOT_ACCEPTABLE_406);
                errorRequest.setError("Email is not valid");
                context.res.getOutputStream().print("Email is not valid");
            } else {
                context.res.setStatus(HttpStatus.NOT_IMPLEMENTED_501);
                context.res.getOutputStream().print("Request is not valid");
            }
            context.res.getOutputStream().close();
        }
    }

    private String passwordToHash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private User generateUser(JavalinJackson jackson, Context context) throws Exception {

        if (jackson == null) {
            throw new Exception("Invalid jackson");
        }
        if (context == null) {
            throw new Exception("Invalid context");
        }
        try {
            String url;

            UploadedFile uploadedFile = context.uploadedFile("img");

            if (uploadedFile != null) {
                url = AwsUploadImage.uploadImgToAws(uploadedFile);
            } else {
                url = null;
            }

            JavalinValidation.register(User.class, s -> jackson.fromJsonString(s, User.class));
            Validator<User> validator = context.formParamAsClass("body", User.class);
            User request = validator.get();

            //BODY
            String name = request.getName();
            String surname = request.getSurname();
            String email = request.getEmail();
            String gender = request.getGender();
            String passwordHash = request.getPasswordHash();

            return new User(name, surname, gender, email, passwordToHash(passwordHash), url);
        } catch (Exception e) {
            System.out.println( e.getMessage());
        }
        return null;
    }



}
