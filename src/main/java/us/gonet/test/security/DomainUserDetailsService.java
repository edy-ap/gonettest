package us.gonet.test.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    
    @Override
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        
        HashMap<String, String> users = new HashMap<>();

        users.put("user1", "$2a$10$8etm9415H5qYajziFb1nYOfpjN/eECE7op7IIhUefNazcKr0BB80u");
        users.put("user2", "$2a$10$8etm9415H5qYajziFb1nYOfpjN/eECE7op7IIhUefNazcKr0BB80u");
        users.put("user3", "$2a$10$8etm9415H5qYajziFb1nYOfpjN/eECE7op7IIhUefNazcKr0BB80u");
        users.put("user4", "$2a$10$8etm9415H5qYajziFb1nYOfpjN/eECE7op7IIhUefNazcKr0BB80u");

        return Optional.ofNullable(users.get(login))
          .map(pass -> createSpringSecurityUser(login, pass))
          .orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found"));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, String password) {
        List<GrantedAuthority> grantedAuthorities = Stream.of("ROLE_USER")
            .map(authority -> new SimpleGrantedAuthority(authority))
            .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(lowercaseLogin,
            password,
            grantedAuthorities);
    }
}
