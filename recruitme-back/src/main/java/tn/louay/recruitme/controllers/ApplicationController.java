package tn.louay.recruitme.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tn.louay.recruitme.entities.Application;
import tn.louay.recruitme.enums.ApplicationStatus;
import tn.louay.recruitme.services.ApplicationService;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@RestController
@RequestMapping("/application")
// @CrossOrigin
public class ApplicationController {
    @Autowired 
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int userId = (int) claims.get("id");

        application.setCreatedBy(userId);
        application.setStatus(ApplicationStatus.pending);

        return ResponseEntity.ok(applicationService.createApplication(application));
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable int applicationId,
            @RequestParam ApplicationStatus status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int recruiterId = (int) claims.get("id");

        

        Application application = applicationService.getApplication(applicationId);
        if (application.getJobOffer().getCreatedBy() != recruiterId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        application.setStatus(status);
        return ResponseEntity.ok(applicationService.updateApplication(application));
    }

    @GetMapping("/{applicationId}")  
    public ResponseEntity<Application> getApplication(@PathVariable int applicationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int recruiterId = (int) claims.get("id");

        Application application = applicationService.getApplication(applicationId);
        if (application.getJobOffer().getCreatedBy() != recruiterId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(application);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable int applicationId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        @SuppressWarnings("unchecked")
        Map<String, Object> claims = (Map<String, Object>) authentication.getDetails();
        int recruiterId = (int) claims.get("id");

        Application application = applicationService.getApplication(applicationId);
        if (application.getJobOffer().getCreatedBy() != recruiterId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        applicationService.deleteApplication(applicationId);
        return ResponseEntity.ok().build();
    }
}