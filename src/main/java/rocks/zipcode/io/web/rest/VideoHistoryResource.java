package rocks.zipcode.io.web.rest;

import com.codahale.metrics.annotation.Timed;
import rocks.zipcode.io.domain.VideoHistory;
import rocks.zipcode.io.repository.VideoHistoryRepository;
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
 * REST controller for managing VideoHistory.
 */
@RestController
@RequestMapping("/api")
public class VideoHistoryResource {

    private final Logger log = LoggerFactory.getLogger(VideoHistoryResource.class);

    private static final String ENTITY_NAME = "videoHistory";

    private final VideoHistoryRepository videoHistoryRepository;

    public VideoHistoryResource(VideoHistoryRepository videoHistoryRepository) {
        this.videoHistoryRepository = videoHistoryRepository;
    }

    /**
     * POST  /video-histories : Create a new videoHistory.
     *
     * @param videoHistory the videoHistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new videoHistory, or with status 400 (Bad Request) if the videoHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/video-histories")
    @Timed
    public ResponseEntity<VideoHistory> createVideoHistory(@RequestBody VideoHistory videoHistory) throws URISyntaxException {
        log.debug("REST request to save VideoHistory : {}", videoHistory);
        if (videoHistory.getId() != null) {
            throw new BadRequestAlertException("A new videoHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VideoHistory result = videoHistoryRepository.save(videoHistory);
        return ResponseEntity.created(new URI("/api/video-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /video-histories : Updates an existing videoHistory.
     *
     * @param videoHistory the videoHistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated videoHistory,
     * or with status 400 (Bad Request) if the videoHistory is not valid,
     * or with status 500 (Internal Server Error) if the videoHistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/video-histories")
    @Timed
    public ResponseEntity<VideoHistory> updateVideoHistory(@RequestBody VideoHistory videoHistory) throws URISyntaxException {
        log.debug("REST request to update VideoHistory : {}", videoHistory);
        if (videoHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VideoHistory result = videoHistoryRepository.save(videoHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, videoHistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /video-histories : get all the videoHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of videoHistories in body
     */
    @GetMapping("/video-histories")
    @Timed
    public List<VideoHistory> getAllVideoHistories() {
        log.debug("REST request to get all VideoHistories");
        return videoHistoryRepository.findAll();
    }

    /**
     * GET  /video-histories/:id : get the "id" videoHistory.
     *
     * @param id the id of the videoHistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the videoHistory, or with status 404 (Not Found)
     */
    @GetMapping("/video-histories/{id}")
    @Timed
    public ResponseEntity<VideoHistory> getVideoHistory(@PathVariable Long id) {
        log.debug("REST request to get VideoHistory : {}", id);
        Optional<VideoHistory> videoHistory = videoHistoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(videoHistory);
    }

    /**
     * DELETE  /video-histories/:id : delete the "id" videoHistory.
     *
     * @param id the id of the videoHistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/video-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteVideoHistory(@PathVariable Long id) {
        log.debug("REST request to delete VideoHistory : {}", id);

        videoHistoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
