package hac.controllers;

import hac.beans.CartItem;
import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.security.auth.message.callback.SecretKeyCallback;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class is used to handle the purchase api requests.
 */
@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
    // inject the purchase repository
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    // get all the purchases
    @GetMapping
    public List<Purchase> showPurchases() {
        return repository.findAll();
    }

    // add a purchase to the database
    @PostMapping
    public ResponseEntity<?> addPurchase(@Valid @RequestBody Purchase purchase , BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        repository.save(purchase);
        return ResponseEntity.ok(purchase);
    }
}
