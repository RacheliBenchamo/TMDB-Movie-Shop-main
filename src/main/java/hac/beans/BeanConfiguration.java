package hac.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

/**
 * This class is used to configure the beans.
 */
@Configuration
public class BeanConfiguration {

    @Bean
    @SessionScope
    public CartItem cartItemSession () {
        CartItem ci =  new CartItem();
        return ci;
    }

    @Bean
    @SessionScope
    public Cart cartSession () {
        Cart c =  new Cart();
        return c;
    }
}
