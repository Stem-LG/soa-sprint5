package tn.louay.recruitme.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

import org.hibernate.annotations.CreationTimestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    private String skills;
    private String company;
    private int createdBy;

    private List<String> images;

    @CreationTimestamp
    private Date createdAt;

    public JobOffer(String title, String description, String skills, String company, int createdBy,
            List<String> images) {
        this.title = title;
        this.description = description;
        this.skills = skills;
        this.company = company;
        this.createdBy = createdBy;
        this.images = images;
        this.createdAt = new Date();
    }

}