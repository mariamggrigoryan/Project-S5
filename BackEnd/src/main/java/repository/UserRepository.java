package repository;

import modal.User;
import request.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserRepository {

    private final Connection connection;

    public UserRepository(Connection connection) {
        this.connection = connection;
    }

    public List<GetAllStylistsRequest> selectAllStylists(){
        List<GetAllStylistsRequest> getAllStylistsRequest = new ArrayList<>();
        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT id, name, surname, avatar_url, email from \"user\";")) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                getAllStylistsRequest.add(generateStylistsGetAllRequest(resultSet));
            }
            resultSet.close();
            return getAllStylistsRequest;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public List<GetAllStylistsAdminRequest> selectAllStylistsForAdmin(){
        List<GetAllStylistsAdminRequest> getAllStylistsAdminRequest = new ArrayList<>();
        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT id, name, surname, avatar_url, email, certificate_url from \"user\";")) {
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                getAllStylistsAdminRequest.add(generateStylistsGetAllAdminRequest(resultSet));
            }
            resultSet.close();
            return getAllStylistsAdminRequest;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public GetUserRequest selectUserById(int id){
        PortfolioRepository portfolioRepository = new PortfolioRepository(connection);
        GetUserRequest getUserRequest = new GetUserRequest();
        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT id, name, surname, avatar_url, email, gender, certificate_url, about_me from \"user\" where id = ?;")) {
            preparedStatement.setInt(1, id);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                getUserRequest.setId(resultSet.getInt("id"));
                getUserRequest.setName(resultSet.getString("name"));
                getUserRequest.setSurname(resultSet.getString("surname"));
                getUserRequest.setAvatarUrl(resultSet.getString("avatar_url"));
                getUserRequest.setEmail(resultSet.getString("email"));
                getUserRequest.setCertificate(resultSet.getString("certificate_url"));
                getUserRequest.setAboutMe(resultSet.getString("about_me"));
                getUserRequest.setGender(resultSet.getString("gender"));
                getUserRequest.setPortfolios(portfolioRepository.selectPortfoliosUserId(id));
            }
            return getUserRequest;
        } catch (SQLException e) {
            System.out.println("id" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void addAvatar(String url, int userId) {
        try (PreparedStatement statement = connection.prepareStatement("UPDATE \"user\" SET avatar_url=? WHERE id=?;")) {
            statement.setString(1, url);
            statement.setInt(2, userId);
            statement.executeUpdate();
            System.out.println(statement.executeUpdate());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }



    public void addAboutMe(String text, int userId) {
        try (PreparedStatement statement = connection.prepareStatement("UPDATE \"user\" SET about_me=? WHERE id=?;")) {
            statement.setString(1, text);
            statement.setInt(2, userId);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public void deleteUser(int userId){
        try(PreparedStatement statement = connection.prepareStatement("Delete from \"user\" where id = ? ")) {
            statement.setInt(1, userId);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean isAdmin(int id){
        try(PreparedStatement statement = connection.prepareStatement("Select id from \"user\" where role_name = 'admin'")) {
            ResultSet resultSet = statement.executeQuery();
            int adminId = 0;
            if(resultSet.next()){
                 adminId = resultSet.getInt("id");
            }
            return id == adminId;
        } catch (SQLException e) {
           throw new RuntimeException(e);
        }
    }


    public void addStylist(User user) throws Exception {
        if (!isValidEmail(user.getEmail())) {
            throw new Exception("Email is not valid");
        }
        try (PreparedStatement statement = connection.prepareStatement(" INSERT INTO \"user\"(name, surname, email, gender, password_hash,certificate_url, role_name) VALUES (?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, user.getName());
            statement.setString(2, user.getSurname());
            statement.setString(3, user.getEmail());
            statement.setString(4, user.getGender());
            statement.setString(5, user.getPasswordHash());
            statement.setString(6, user.getCertificateUrl());
           statement.setString(7, "user");
            statement.executeUpdate();
            ResultSet resultSet = statement.getGeneratedKeys();
            if (resultSet.next()) {
                int id = resultSet.getInt(1);
                user.setId(id);
            }
        }
    }

    public SignInRequest selectByUsernameSignIn(String email) {
        SignInRequest signInRequest = new SignInRequest();
        try (PreparedStatement statement = connection.prepareStatement("SELECT id, email, password_hash FROM \"user\" WHERE email = ?")) {
            statement.setObject(1, email);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                signInRequest.setId(resultSet.getInt("id"));
                signInRequest.setEmail(resultSet.getString("email"));
                signInRequest.setPassword(resultSet.getString("password_hash"));
            }
            return signInRequest;

        } catch (SQLException e) {
            System.out.println("SignIn" + e.getMessage());
        }
        return null;
    }

    private GetAllStylistsRequest generateStylistsGetAllRequest(ResultSet resultSet) throws SQLException {
        GetAllStylistsRequest getAllStylistsRequest = new GetAllStylistsRequest();
        getAllStylistsRequest.setId(resultSet.getInt("id"));
        getAllStylistsRequest.setAvatarUrl(resultSet.getString("avatar_url"));
        getAllStylistsRequest.setEmail(resultSet.getString("email"));
        getAllStylistsRequest.setName(resultSet.getString("name"));
        getAllStylistsRequest.setSurname(resultSet.getString("surname"));
        return getAllStylistsRequest;
    }

    private GetAllStylistsAdminRequest generateStylistsGetAllAdminRequest(ResultSet resultSet) throws SQLException {
        GetAllStylistsAdminRequest getAllStylistsAdminRequest = new GetAllStylistsAdminRequest();
        getAllStylistsAdminRequest.setId(resultSet.getInt("id"));
        getAllStylistsAdminRequest.setAvatarUrl(resultSet.getString("avatar_url"));
        getAllStylistsAdminRequest.setEmail(resultSet.getString("email"));
        getAllStylistsAdminRequest.setName(resultSet.getString("name"));
        getAllStylistsAdminRequest.setSurname(resultSet.getString("surname"));
        getAllStylistsAdminRequest.setCertificate(resultSet.getString("certificate_url"));
        return getAllStylistsAdminRequest;
    }

    private boolean isValidEmail(String email) {
        String regex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }


}
