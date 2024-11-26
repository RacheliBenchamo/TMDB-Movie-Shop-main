package hac.beans;
import hac.errors.ErrorMessage;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.io.Serializable;

/**
 * This class is used to represent a cart item.
 * It is used to store the information of a product in the cart.
 * It is also used to validate the information of the product.
 */
@Entity
public class CartItem implements Serializable {

    @Id
    @NotNull(message = ErrorMessage.ID_MANDATORY)
    private Long id;

    @NotEmpty(message = ErrorMessage.TITLE_MANDATORY)
    private String title;

    @NotEmpty(message = ErrorMessage.RELEASE_DATE_MANDATORY)
    private String releaseDate;

    @NotEmpty(message = ErrorMessage.PICTURE_URL_MANDATORY)
    private String pictureUrl;

    @PositiveOrZero(message = ErrorMessage.PRICE_POSITIVE)
    private Double price = 0.0;

    // Quantity of the product
    @PositiveOrZero(message = ErrorMessage.QUANTITY_POSITIVE)
    private Integer quantity = 1;

    public CartItem(Long id, String title, String releaseDate, String pictureUrl, Double price) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.pictureUrl = pictureUrl;
        this.price = price;
    }

    public CartItem() {}

    // getters and setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public double getPrice() {
        return price;
    }

    public Integer getQuantity() { return quantity; }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(Integer quantity) { this.quantity = quantity; }

}



