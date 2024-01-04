package com.jozwiaka.backend.dao;

import com.jozwiaka.backend.entity.ChampionTree;
import com.jozwiaka.backend.entity.ChampionTreeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "championTrees", path = "champion-trees")
public interface ChampionTreeRepository extends JpaRepository<ChampionTree, ChampionTreeId> {
    List<ChampionTree> findByChampionId(@Param("id") Long championId);
}