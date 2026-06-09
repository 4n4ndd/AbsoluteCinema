package com.absolutecinema.backend.Repository;

import com.absolutecinema.backend.model.User;
//import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Optional<Object> findByEmail(String email);
}
