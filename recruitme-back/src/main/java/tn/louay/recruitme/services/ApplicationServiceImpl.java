package tn.louay.recruitme.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.louay.recruitme.entities.Application;
import tn.louay.recruitme.repositories.ApplicationRepository;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> getApplicationsByJobOfferId(int jobOfferId) {
        return applicationRepository.findByJobOfferId(jobOfferId);
    }

    public List<Application> getApplicationsByJobOfferIdAndName(int jobOfferId, String name) {
        return applicationRepository.findByJobOfferIdAndName(jobOfferId, name);
    }

    public Application getApplication(int id) {
        return applicationRepository.findById(id).get();
    }

    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application updateApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void deleteApplication(int id) {
        applicationRepository.deleteById(id);
    }
}
