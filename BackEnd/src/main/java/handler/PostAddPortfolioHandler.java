package handler;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.UploadedFile;
import org.eclipse.jetty.http.HttpStatus;
import org.jetbrains.annotations.NotNull;
import repository.AwsUploadImage;
import repository.JWT;
import repository.PortfolioRepository;
import repository.UserRepository;
import request.AddImgRequest;

import java.sql.SQLException;

public class PostAddPortfolioHandler implements Handler {

    JWT jwt = new JWT();
    PortfolioRepository repository;

    public PostAddPortfolioHandler(PortfolioRepository portfolioRepository) {
        this.repository = portfolioRepository;
    }


    @Override
    public void handle(@NotNull Context context) throws Exception {
        String token = context.req.getHeader("X-token");
        AddImgRequest addImgRequest = new AddImgRequest();


        try {
            if (token == null) {
                throw new Exception("No token, authorization denied");
            }

            jwt.verifyJWT(token);

            String url;

            UploadedFile uploadedFile = context.uploadedFile("img");

            int id = jwt.getUserId(token);

            if (uploadedFile != null) {
                url = AwsUploadImage.uploadImgToAws(uploadedFile);
                repository.addPortfolio(url, id);
                addImgRequest.setUrl(url);
                context.res.setStatus(HttpStatus.OK_200);
                context.res.setHeader("X-token", token);
                context.json(addImgRequest);
            } else {
                context.res.setStatus(HttpStatus.BAD_REQUEST_400);
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            context.res.setStatus(HttpStatus.BAD_GATEWAY_502);
        }


    }


}
