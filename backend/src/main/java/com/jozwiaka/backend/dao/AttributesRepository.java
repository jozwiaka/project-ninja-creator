package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.Attributes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "attributes", path = "attributes")
public interface AttributesRepository extends JpaRepository<Attributes, Long> {
    Attributes findByChampionId(@Param("id") Long championId);
}
