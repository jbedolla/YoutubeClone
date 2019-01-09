package rocks.zipcode.io.web.rest;

import com.codahale.metrics.annotation.Timed;
import rocks.zipcode.io.domain.Browse;
import rocks.zipcode.io.service.BrowseService;
import rocks.zipcode.io.web.rest.errors.BadRequestAlertException;
import rocks.zipcode.io.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Browse.
 */
@RestController
@RequestMapping("/api")
public class BrowseResource {

    private final Logger log = LoggerFactory.getLogger(BrowseResource.class);

    private static final String ENTITY_NAME = "browse";

    private final BrowseService browseService;

    public BrowseResource(BrowseService browseService) {
        this.browseService = browseService;
    }

    /**
     * POST  /browses : Create a new browse.
     *
     * @param browse the browse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new browse, or with status 400 (Bad Request) if the browse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/browses")
    @Timed
    public ResponseEntity<Browse> createBrowse(@RequestBody Browse browse) throws URISyntaxException {
        log.debug("REST request to save Browse : {}", browse);
        if (browse.getId() != null) {
            throw new BadRequestAlertException("A new browse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Browse result = browseService.save(browse);
        return ResponseEntity.created(new URI("/api/browses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /browses : Updates an existing browse.
     *
     * @param browse the browse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated browse,
     * or with status 400 (Bad Request) if the browse is not valid,
     * or with status 500 (Internal Server Error) if the browse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/browses")
    @Timed
    public ResponseEntity<Browse> updateBrowse(@RequestBody Browse browse) throws URISyntaxException {
        log.debug("REST request to update Browse : {}", browse);
        if (browse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Browse result = browseService.save(browse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, browse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /browses : get all the browses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of browses in body
     */
    @GetMapping("/browses")
    @Timed
    public List<Browse> getAllBrowses() {
        log.debug("REST request to get all Browses");
        return browseService.findAll();
    }

    /**
     * GET  /browses/:id : get the "id" browse.
     *
     * @param id the id of the browse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the browse, or with status 404 (Not Found)
     */
    @GetMapping("/browses/{id}")
    @Timed
    public ResponseEntity<Browse> getBrowse(@PathVariable Long id) {
        log.debug("REST request to get Browse : {}", id);
        Optional<Browse> browse = browseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(browse);
    }

    /**
     * DELETE  /browses/:id : delete the "id" browse.
     *
     * @param id the id of the browse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/browses/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrowse(@PathVariable Long id) {
        log.debug("REST request to delete Browse : {}", id);
        browseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
