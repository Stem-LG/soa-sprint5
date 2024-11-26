package tn.louay.recruitme.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.louay.recruitme.entities.DBFile;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, Integer> {

}
