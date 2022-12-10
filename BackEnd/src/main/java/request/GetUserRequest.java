package request;

import java.util.List;

public class GetUserRequest {
    private int id;
    private String email;
    private String avatarUrl;
    private String name;
    private String gender;
    private String surname;
    private String aboutMe;
    private String certificate;
    private List<GetPortfolio> portfolios;

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public List<GetPortfolio> getPortfolios() {
        return portfolios;
    }

    public void setPortfolios(List<GetPortfolio> portfolios) {
        this.portfolios = portfolios;
    }
}
