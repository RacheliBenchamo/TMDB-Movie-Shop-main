package hac.beans;
import hac.errors.ErrorMessage;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * This class is used to represent a cart.
 */
@Component
public class Cart implements Serializable {

    private List<CartItem> cart;
    public Cart() {
        this.cart = new ArrayList<>();
    }
    public List<CartItem> getCart() {
        return cart;
    }
    public void setCart(List<CartItem> cart) {
        this.cart = cart;
    }

    /**
     * This function is used to add an item to the cart if it does not exist.
     * if it exists, it will increase the quantity by 1.
     * @param cartItem
     */
    public void addToCart(CartItem cartItem) {
        Optional<CartItem> existingItem = findItemById(cartItem.getId());
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
        } else {
            cart.add(cartItem);
        }
    }

    /**
     * This function get a item id and increase the quantity of the item by 1 if it exists.
     * if it does not exist, it will throw an exception.
     * @param id
     */
    public void addOneToCart(Long id) {
        Optional<CartItem> existingItem = findItemById(id);
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
        } else {
            throw new IllegalArgumentException(ErrorMessage.NOT_FOUND);
        }
    }
    /**
     * This function get a item id and decrease the quantity of the item by 1 if it exists.
     * if it does not exist, it will throw an exception.
     * @param id
     */
    public void subOneFromCart(Long id) {
        Optional<CartItem> existingItem = findItemById(id);
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() - 1);
            if (item.getQuantity() == 0) {
                cart.remove(item);
            }
        } else {
            throw new IllegalArgumentException(ErrorMessage.NOT_FOUND);
        }
    }

    /**
     * This function get a item id and delete the item from the cart if it exists.
     * if it does not exist, it will throw an exception.
     * @param id
     */
    public void deleteFromCart(Long id) {
        Optional<CartItem> existingItem = findItemById(id);
        if (existingItem.isPresent()) {
            cart.remove(existingItem.get());
        } else {
            throw new IllegalArgumentException(ErrorMessage.NOT_FOUND);
        }
    }

    /**
     * This function delete all items from the cart.
     */
    public void deleteAllFromCart() {
        cart.clear();
    }

    /**
     * This function get a item id and return the item if it exists.
     * @param id
     * @return
     */
    private Optional<CartItem> findItemById(Long id) {
        return cart.stream()
                .filter(item -> Objects.equals(item.getId(), id))
                .findFirst();
    }
}
