package rocks.zipcode.io.service;

import rocks.zipcode.io.domain.Browse;
import rocks.zipcode.io.repository.BrowseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Browse.
 */
@Service
@Transactional
public class BrowseService {

    private final Logger log = LoggerFactory.getLogger(BrowseService.class);

    private final BrowseRepository browseRepository;

    public BrowseService(BrowseRepository browseRepository) {
        this.browseRepository = browseRepository;
    }

    /**
     * Save a browse.
     *
     * @param browse the entity to save
     * @return the persisted entity
     */
    public Browse save(Browse browse) {
        log.debug("Request to save Browse : {}", browse);
        return browseRepository.save(browse);
    }

    /**
     * Get all the browses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Browse> findAll() {
        log.debug("Request to get all Browses");
        return browseRepository.findAll();
    }


    /**
     * Get one browse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Browse> findOne(Long id) {
        log.debug("Request to get Browse : {}", id);
        return browseRepository.findById(id);
    }

    /**
     * Delete the browse by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Browse : {}", id);
        browseRepository.deleteById(id);
    }
}
