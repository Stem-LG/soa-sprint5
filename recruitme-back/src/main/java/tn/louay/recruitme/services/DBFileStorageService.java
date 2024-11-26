package tn.louay.recruitme.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import tn.louay.recruitme.entities.DBFile;
import tn.louay.recruitme.repositories.DBFileRepository;

@Service
public class DBFileStorageService {

    @Autowired
    private DBFileRepository dbFileRepository;

    public DBFile storeFile(MultipartFile file, int userId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new Error("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes(), userId);

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new Error("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DBFile getFile(int fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new Error("File not found with id " + fileId));
    }
}
