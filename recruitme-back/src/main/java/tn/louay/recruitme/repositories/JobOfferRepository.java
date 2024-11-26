package tn.louay.recruitme.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.repository.query.Param;

import tn.louay.recruitme.entities.JobOffer;
@RepositoryRestResource(path = "offers")
// @CrossOrigin
public interface JobOfferRepository extends JpaRepository<JobOffer, Integer> {
        @RestResource(path = "byTitle")
        @Query("SELECT j FROM JobOffer j WHERE j.title LIKE %?1%")
        Page<JobOffer> findByTitle(@Param("title") String title, Pageable pageable);

        @RestResource(path = "bySkill")
        @Query("SELECT j FROM JobOffer j WHERE j.skills LIKE %?1%")
        Page<JobOffer> findBySkill(@Param("skill") String skill, Pageable pageable);

        @RestResource(path = "byCompany")
        @Query("SELECT j FROM JobOffer j WHERE j.company LIKE %?1%")
        Page<JobOffer> findByCompany(@Param("company") String company, Pageable pageable);

        @RestResource(path = "byRecruiter")
        @Query("SELECT j FROM JobOffer j WHERE j.createdBy = :recruiterId")
        Page<JobOffer> findByRecruiter(@Param("recruiterId") Integer recruiterId, Pageable pageable);

        @RestResource(path = "byRecruiterAndTitle")
        @Query("SELECT j FROM JobOffer j WHERE j.createdBy = :recruiterId AND j.title LIKE %:title%")
        Page<JobOffer> findByRecruiterAndTitle(@Param("recruiterId") Integer recruiterId, @Param("title") String title,
                        Pageable pageable);

        @RestResource(path = "byRecruiterAndSkill")
        @Query("SELECT j FROM JobOffer j WHERE j.createdBy = :recruiterId AND j.skills LIKE %:skill%")
        Page<JobOffer> findByRecruiterAndSkill(@Param("recruiterId") Integer recruiterId, @Param("skill") String skill,
                        Pageable pageable);

        @RestResource(path = "byRecruiterAndCompany")
        @Query("SELECT j FROM JobOffer j WHERE j.createdBy = :recruiterId AND j.company LIKE %:company%")
        Page<JobOffer> findByRecruiterAndCompany(@Param("recruiterId") Integer recruiterId,
                        @Param("company") String company, Pageable pageable);

}
