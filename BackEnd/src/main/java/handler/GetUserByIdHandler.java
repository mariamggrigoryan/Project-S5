package handler;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import modal.User;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import repository.JWT;
import repository.UserRepository;
import request.GetUserRequest;

public class GetUserByIdHandler implements Handler {
    UserRepository repository;

    public GetUserByIdHandler(UserRepository userRepository){
        this.repository = userRepository;
    }


    @Override
    public void handle(@NotNull Context context) throws Exception {
        JWT jwt = new JWT();

         GetUserRequest getUserRequest ;
         String token = context.header("X-token");
        try{
            String id =context.req.getParameter("id");

            if(id == null){
                jwt.verifyJWT(token);
                id = String.valueOf(jwt.getUserId(token));
                context.res.setHeader("X-token", token);
            }

            getUserRequest = repository.selectUserById(Integer.parseInt(id));

            context.res.setStatus(HttpStatus.OK_200);
            context.json(getUserRequest);
        }catch(Exception e){
            System.out.println("232323" + e.getMessage());
            context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
            context.res.getOutputStream().print("Error");
            context.res.getOutputStream().close();
        }
    }
}
