package handler;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.plugin.json.JavalinJackson;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import repository.JWT;
import repository.UserRepository;
import request.AddAboutMeRequest;

public class PostAddAboutMeHandler implements Handler {
    UserRepository repository;
    JWT jwt = new JWT();

    public PostAddAboutMeHandler(UserRepository userRepository){
        this.repository = userRepository;
    }

    @Override
    public void handle(@NotNull Context context) throws Exception {
        try {
            String token = context.header("X-token");
            jwt.verifyJWT(token);
            int id = jwt.getUserId(token);
            String text = getText(new JavalinJackson(), context);
            AddAboutMeRequest addAboutMeRequest = new AddAboutMeRequest();
            repository.addAboutMe(text, id);
            addAboutMeRequest.setText(text);
            context.res.setStatus(200);
            context.res.setHeader("X-token", token);
            context.json(addAboutMeRequest);
        }catch(Exception e){
            System.out.println(e.getMessage());
            System.out.println(e.getMessage());
            context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
            context.res.getOutputStream().print("Error");
            context.res.getOutputStream().close();
        }


    }

    private String getText(JavalinJackson javalinJackson, Context context) throws Exception {
        if (javalinJackson == null) {
            throw new Exception("Invalid jackson");
        }
        if (context == null) {
            throw new Exception("Invalid context");
        }
        AddAboutMeRequest addAboutMeRequest = javalinJackson.fromJsonString(context.body(), AddAboutMeRequest.class);
        return addAboutMeRequest.getText();

    }
}
