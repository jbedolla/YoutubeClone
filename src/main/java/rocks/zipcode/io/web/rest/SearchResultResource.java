package rocks.zipcode.io.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import rocks.zipcode.io.domain.SearchResult;
import rocks.zipcode.io.repository.SearchResultRepository;
import rocks.zipcode.io.service.YoutubeService;
import rocks.zipcode.io.web.rest.errors.BadRequestAlertException;
import rocks.zipcode.io.web.rest.util.HeaderUtil;
import rocks.zipcode.io.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SearchResult.
 */
@RestController
@RequestMapping("/api")
public class SearchResultResource {

    @Autowired
    YoutubeService youtubeService;

    private final Logger log = LoggerFactory.getLogger(SearchResultResource.class);

    private static final String ENTITY_NAME = "searchResult";

    private final SearchResultRepository searchResultRepository;

    public SearchResultResource(SearchResultRepository searchResultRepository) {
        this.searchResultRepository = searchResultRepository;
    }

    /**
     * POST  /search-results : Create a new searchResult.
     *
     * @param searchResult the searchResult to create
     * @return the ResponseEntity with status 201 (Created) and with body the new searchResult, or with status 400 (Bad Request) if the searchResult has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/search-results")
    @Timed
    public ResponseEntity<SearchResult> createSearchResult(@RequestBody SearchResult searchResult) throws URISyntaxException {
        log.debug("REST request to save SearchResult : {}", searchResult);
        if (searchResult.getId() != null) {
            throw new BadRequestAlertException("A new searchResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SearchResult result = searchResultRepository.save(searchResult);
        return ResponseEntity.created(new URI("/api/search-results/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /search-results : Updates an existing searchResult.
     *
     * @param searchResult the searchResult to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated searchResult,
     * or with status 400 (Bad Request) if the searchResult is not valid,
     * or with status 500 (Internal Server Error) if the searchResult couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/search-results")
    @Timed
    public ResponseEntity<SearchResult> updateSearchResult(@RequestBody SearchResult searchResult) throws URISyntaxException {
        log.debug("REST request to update SearchResult : {}", searchResult);
        if (searchResult.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SearchResult result = searchResultRepository.save(searchResult);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, searchResult.getId().toString()))
            .body(result);
    }

    /**
     * GET  /search-results : get all the searchResults.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of searchResults in body
     */
    @GetMapping("/search-results")
    @Timed
    public ResponseEntity<List<SearchResult>> getAllSearchResults(Pageable pageable) {
        log.debug("REST request to get a page of SearchResults");
        Page<SearchResult> page = searchResultRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/search-results");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /search-results/:id : get the "id" searchResult.
     *
     * @param id the id of the searchResult to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the searchResult, or with status 404 (Not Found)
     */
    @GetMapping("/search-results/{id}")
    @Timed
    public ResponseEntity<SearchResult> getSearchResult(@PathVariable Long id) {
        log.debug("REST request to get SearchResult : {}", id);
        Optional<SearchResult> searchResult = searchResultRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(searchResult);
    }

    /**
     * DELETE  /search-results/:id : delete the "id" searchResult.
     *
     * @param id the id of the searchResult to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/search-results/{id}")
    @Timed
    public ResponseEntity<Void> deleteSearchResult(@PathVariable Long id) {
        log.debug("REST request to delete SearchResult : {}", id);

        searchResultRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

//    @GetMapping("/search-results")
//    @Timed
//    public ResponseEntity<?> searchByCategory() {
//        log.debug("REST request to get SearchResults for CategoryById");
//        Iterable<com.google.api.services.youtube.model.SearchResult> searchResult = youtubeService.searchByCategory("10");
//        return new ResponseEntity<>(searchResult, HttpStatus.OK);
//    }
}
