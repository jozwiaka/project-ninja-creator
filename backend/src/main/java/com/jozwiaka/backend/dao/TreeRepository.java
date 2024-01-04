package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface TreeRepository extends JpaRepository<Tree, Long> {
}
