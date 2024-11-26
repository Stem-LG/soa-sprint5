package tn.louay.recruitme.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.louay.recruitme.entities.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {
    List<Application> findByJobOfferId(int jobOfferId);

    @Query("SELECT a FROM Application a WHERE a.jobOffer.id = ?1 AND a.name LIKE %?2%")
    List<Application> findByJobOfferIdAndName(int jobOfferId, String name);
}
