package handler;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import modal.User;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import repository.JWT;
import repository.UserRepository;
import request.ErrorRequest;
import request.GetAllStylistsAdminRequest;
import request.GetAllStylistsRequest;

import java.util.ArrayList;
import java.util.List;

public class GetAllStylistsAdminHandler implements Handler {
    UserRepository repository ;
    JWT jwt = new JWT();

    public GetAllStylistsAdminHandler(UserRepository userRepository){
        this.repository = userRepository;
    }

    List<GetAllStylistsAdminRequest> getAllStylistsAdminRequest = new ArrayList<>();


    @Override
    public void handle(@NotNull Context context) throws Exception {
        String token = context.header("X-token");
        ErrorRequest error = new ErrorRequest();
        try {
            jwt.verifyJWT(token);
            if(!repository.isAdmin(jwt.getUserId(token))){
                throw new Exception("You are not admin");
            }
            getAllStylistsAdminRequest = repository.selectAllStylistsForAdmin();
            context.res.setStatus(HttpStatus.OK_200);
            context.res.setHeader("X-token", token);
            context.json(getAllStylistsAdminRequest);
        }catch(Exception e){
            if(e.getMessage().contains("You are not admin")){
                error.setError("You are not admin0");
                context.res.setStatus(HttpStatus.BAD_REQUEST_400);
                context.json(error);
            }
            System.out.println(e.getMessage());
            context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
            context.res.getOutputStream().print("Error");
            context.res.getOutputStream().close();
        }
    }
}
