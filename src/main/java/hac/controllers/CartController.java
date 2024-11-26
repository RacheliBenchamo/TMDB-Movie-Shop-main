package hac.controllers;
import hac.errors.ErrorMessage;

import hac.beans.Cart;
import hac.beans.CartItem;

import jakarta.validation.Valid;

import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class is used to handle the cart api requests.
 * It is used to add, increase, decrease and delete items from the cart.
 * And also used to get the cart items.
 */
@Controller
@RequestMapping("/api/cart")
public class CartController {
    private final Cart cart;

    // inject the cart session bean
    @Autowired
    public CartController(@Qualifier("cartSession") Cart cart) {
        this.cart = cart;
    }

    // get the cart items
    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems() {
        List<CartItem> cartItems = cart.getCart();
        return ResponseEntity.ok(cartItems);
    }

    // add an item to the cart and return the cart items
    @PostMapping
    @ResponseBody
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartItem cartItem, BindingResult bindingResult) {
        // check if there is any validation error
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        cart.addToCart(cartItem);
        return getCartItems();
    }

    // increase the quantity of an item by 1 and return the cart items
    @PostMapping("/increase/{id}")
    @ResponseBody
    public ResponseEntity<?> addOneToCart(@PathVariable("id") String id) {
        return performCartOperation(id, cart::addOneToCart);
    }

    // decrease the quantity of an item by 1 and return the cart items
    @DeleteMapping("/decrease/{id}")
    @ResponseBody
    public ResponseEntity<?> subOneFromCart(@PathVariable("id") String id) {
        return performCartOperation(id, cart::subOneFromCart);
    }

    // delete an item from the cart and return the cart items
    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteItem(@PathVariable("id") String id) {
        return performCartOperation(id, cart::deleteFromCart);
    }

    // delete all items from the cart
    @DeleteMapping("/delete")
    @ResponseBody
    public ResponseEntity<List<CartItem>> deleteCart() {
        cart.deleteAllFromCart();
        return getCartItems();
    }

    // perform a cart operation and return the cart items
    private ResponseEntity<?> performCartOperation(String id, CartOperation cartOperation) {
        try {
            Long longId = Long.parseLong(id);
            cartOperation.perform(longId);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(ErrorMessage.INVALID_ID_TYPE);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return getCartItems();
    }

    // functional interface to perform cart operations
    @FunctionalInterface
    private interface CartOperation {
        void perform(Long id);
    }
}
