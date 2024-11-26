package tn.louay.recruitme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import tn.louay.recruitme.entities.Application;
import tn.louay.recruitme.entities.DBFile;
import tn.louay.recruitme.entities.JobOffer;

@SpringBootApplication
@EnableDiscoveryClient
public class RecruitmeApplication implements CommandLineRunner {

	@Autowired
	RepositoryRestConfiguration repositoryRestConfiguration;

	public static void main(String[] args) {
		SpringApplication.run(RecruitmeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		repositoryRestConfiguration.exposeIdsFor(JobOffer.class);
		repositoryRestConfiguration.exposeIdsFor(Application.class);
		repositoryRestConfiguration.exposeIdsFor(DBFile.class);
	}

}
