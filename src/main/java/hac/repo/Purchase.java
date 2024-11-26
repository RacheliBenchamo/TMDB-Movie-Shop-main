package hac.repo;
import hac.errors.ErrorMessage;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import java.io.Serializable;

/**
 * This class is used to represent a purchase.
 * It is used to store the information of a purchase.
 * It is also used to validate the information of the purchase.
 */
@Entity
public class Purchase implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = ErrorMessage.FIRST_NAME_MANDATORY)
    private String firstName;

    @NotEmpty(message = ErrorMessage.LAST_NAME_MANDATORY)
    private String lastName;

    @NotEmpty(message = ErrorMessage.EMAIL_MANDATORY)
    @Email(message = ErrorMessage.EMAIL_VALID)
    private String email;

    @Positive(message = ErrorMessage.PAYMENT_POSITIVE)
    private Double payment = 0.0;

    public Purchase(String email, Double total, String firstName, String lastName) {
        this.email = email;
        this.payment = total;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Purchase() {}

    // getters and setters
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Double getPayment() {
        return payment;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName=firstName;
    }

    public void setLastName(String lastName) {
        this.lastName=lastName;
    }

    public void setPayment(Double payment) {
        this.payment=payment;
    }

    public void setEmail(String email) {
        this.email=email;
    }

}


