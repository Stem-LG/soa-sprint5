package tn.louay.recruitme.handlers;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import tn.louay.recruitme.entities.JobOffer;
import java.util.Map;

@Component
@RepositoryEventHandler(JobOffer.class)
public class JobOfferEventHandler {

    @HandleBeforeCreate
    public void handleBeforeCreate(JobOffer jobOffer) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int userId = (int) claims.get("id");

        jobOffer.setCreatedBy(userId);

    }

    @HandleBeforeSave
    @HandleBeforeDelete
    public void handleBeforeWriteOperation(JobOffer jobOffer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int userId = (int) claims.get("id");

        if (jobOffer.getCreatedBy() != userId) {
            throw new RuntimeException("Not authorized to modify this job offer");
        }
    }
}
