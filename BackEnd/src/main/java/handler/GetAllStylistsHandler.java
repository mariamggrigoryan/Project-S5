package handler;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import repository.UserRepository;
import request.GetAllStylistsRequest;

import java.util.ArrayList;
import java.util.List;

public class GetAllStylistsHandler implements Handler {

    UserRepository repository;

    public GetAllStylistsHandler(UserRepository userRepository){
        this.repository = userRepository;
    }


    List<GetAllStylistsRequest> getAllStylistsRequests = new ArrayList<>();
    @Override
    public void handle(@NotNull Context context) throws Exception {
        try {
            getAllStylistsRequests = repository.selectAllStylists();
            context.res.setStatus(HttpStatus.OK_200);
            context.json(getAllStylistsRequests);
        }catch(Exception e){
            context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
            context.res.getOutputStream().print("Error");
            context.res.getOutputStream().close();
        }
    }
}
