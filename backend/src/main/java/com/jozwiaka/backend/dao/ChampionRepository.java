package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.Champion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ChampionRepository extends JpaRepository<Champion, Long> {
}
