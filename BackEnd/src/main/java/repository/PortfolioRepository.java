package repository;

import request.GetPortfolio;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PortfolioRepository {

    private final Connection connection;

    public PortfolioRepository(Connection connection) {
        this.connection = connection;
    }

    public List<GetPortfolio> selectPortfoliosUserId(int userId) {
        List<GetPortfolio> getPortfolios = new ArrayList<>();
        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT img_url from portfolio where user_id = ?;")) {
            preparedStatement.setInt(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                getPortfolios.add(generatePortfolio(resultSet));
            }
            resultSet.close();
            return getPortfolios;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public void addPortfolio(String url, int userId) {
        try (PreparedStatement statement = connection.prepareStatement("INSERT INTO portfolio(img_url, user_id) VALUES (?,?);")) {
            statement.setString(1, url);
            statement.setInt(2, userId);
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private GetPortfolio generatePortfolio(ResultSet resultSet) throws SQLException {
        GetPortfolio getPortfolio = new GetPortfolio();
        getPortfolio.setImgUrl(resultSet.getString("img_url"));
        return getPortfolio;
    }


}
