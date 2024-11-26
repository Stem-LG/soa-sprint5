package tn.louay.recruitme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class uploadFileResponseDTO {
    private int id;
    private String fileName;
    private String fileType;
    private long size;
}
