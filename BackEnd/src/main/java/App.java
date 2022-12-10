import connection.ConnectionFactory;
import handler.*;
import io.javalin.Javalin;
import repository.PortfolioRepository;
import repository.UserRepository;

import java.sql.Connection;
import java.sql.SQLException;
import io.javalin.http.Handler;


public class App {
    public static void main(String[] args) {
        Javalin app = Javalin.create(config ->
                config.enableCorsForAllOrigins()).start(7070);
        try {
            Connection connection = ConnectionFactory.getInstance();

            UserRepository userRepository = new UserRepository(connection);
            PortfolioRepository portfolioRepository = new PortfolioRepository(connection);

            Handler getAllStylistsHandler = new GetAllStylistsHandler(userRepository);
            Handler getAllStylistsAdminHandler = new GetAllStylistsAdminHandler(userRepository);
            Handler getStylist = new GetUserByIdHandler(userRepository);

            Handler signUp = new PostAddStylistHandler(userRepository);
            Handler signIn = new PostSignInHandler(userRepository);
            Handler addAboutMeHandler = new PostAddAboutMeHandler(userRepository);
            Handler addAvatarHandler = new PostAddAvatarHandler(userRepository);
            Handler addPortfolio = new PostAddPortfolioHandler(portfolioRepository);

            Handler deleteUserHandler = new DeleteUserHandler(userRepository);

            app.get("/stylists", getAllStylistsHandler);
            app.get("/admin",getAllStylistsAdminHandler);
            app.get("/stylist", getStylist);

            app.post("/signIn" , signIn);
            app.post("/signUp", signUp);
            app.post("/aboutMe", addAboutMeHandler);
            app.post("/avatar", addAvatarHandler);
            app.post("/portfolio" , addPortfolio);

            app.delete("/delete", deleteUserHandler);



        }catch(SQLException e){
            System.out.println(e.getMessage());
        }

}
}
