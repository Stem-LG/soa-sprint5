package tn.louay.recruitme.services;

import tn.louay.recruitme.entities.Application;
import java.util.*;

public interface ApplicationService {

    List<Application> getApplicationsByJobOfferId(int jobOfferId);

    List<Application> getApplicationsByJobOfferIdAndName(int jobOfferId, String name);

    Application getApplication(int id);

    Application createApplication(Application application);

    Application updateApplication(Application application);

    void deleteApplication(int id);

}
