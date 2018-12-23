package rocks.zipcode.io.web.rest;

import rocks.zipcode.io.ZipFlix2App;

import rocks.zipcode.io.domain.VideoHistory;
import rocks.zipcode.io.repository.VideoHistoryRepository;
import rocks.zipcode.io.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static rocks.zipcode.io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VideoHistoryResource REST controller.
 *
 * @see VideoHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ZipFlix2App.class)
public class VideoHistoryResourceIntTest {

    private static final LocalDate DEFAULT_TIMESTAMP = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TIMESTAMP = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private VideoHistoryRepository videoHistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVideoHistoryMockMvc;

    private VideoHistory videoHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VideoHistoryResource videoHistoryResource = new VideoHistoryResource(videoHistoryRepository);
        this.restVideoHistoryMockMvc = MockMvcBuilders.standaloneSetup(videoHistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideoHistory createEntity(EntityManager em) {
        VideoHistory videoHistory = new VideoHistory()
            .timestamp(DEFAULT_TIMESTAMP);
        return videoHistory;
    }

    @Before
    public void initTest() {
        videoHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createVideoHistory() throws Exception {
        int databaseSizeBeforeCreate = videoHistoryRepository.findAll().size();

        // Create the VideoHistory
        restVideoHistoryMockMvc.perform(post("/api/video-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoHistory)))
            .andExpect(status().isCreated());

        // Validate the VideoHistory in the database
        List<VideoHistory> videoHistoryList = videoHistoryRepository.findAll();
        assertThat(videoHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        VideoHistory testVideoHistory = videoHistoryList.get(videoHistoryList.size() - 1);
        assertThat(testVideoHistory.getTimestamp()).isEqualTo(DEFAULT_TIMESTAMP);
    }

    @Test
    @Transactional
    public void createVideoHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = videoHistoryRepository.findAll().size();

        // Create the VideoHistory with an existing ID
        videoHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideoHistoryMockMvc.perform(post("/api/video-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoHistory)))
            .andExpect(status().isBadRequest());

        // Validate the VideoHistory in the database
        List<VideoHistory> videoHistoryList = videoHistoryRepository.findAll();
        assertThat(videoHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVideoHistories() throws Exception {
        // Initialize the database
        videoHistoryRepository.saveAndFlush(videoHistory);

        // Get all the videoHistoryList
        restVideoHistoryMockMvc.perform(get("/api/video-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(videoHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())));
    }
    
    @Test
    @Transactional
    public void getVideoHistory() throws Exception {
        // Initialize the database
        videoHistoryRepository.saveAndFlush(videoHistory);

        // Get the videoHistory
        restVideoHistoryMockMvc.perform(get("/api/video-histories/{id}", videoHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(videoHistory.getId().intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVideoHistory() throws Exception {
        // Get the videoHistory
        restVideoHistoryMockMvc.perform(get("/api/video-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVideoHistory() throws Exception {
        // Initialize the database
        videoHistoryRepository.saveAndFlush(videoHistory);

        int databaseSizeBeforeUpdate = videoHistoryRepository.findAll().size();

        // Update the videoHistory
        VideoHistory updatedVideoHistory = videoHistoryRepository.findById(videoHistory.getId()).get();
        // Disconnect from session so that the updates on updatedVideoHistory are not directly saved in db
        em.detach(updatedVideoHistory);
        updatedVideoHistory
            .timestamp(UPDATED_TIMESTAMP);

        restVideoHistoryMockMvc.perform(put("/api/video-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVideoHistory)))
            .andExpect(status().isOk());

        // Validate the VideoHistory in the database
        List<VideoHistory> videoHistoryList = videoHistoryRepository.findAll();
        assertThat(videoHistoryList).hasSize(databaseSizeBeforeUpdate);
        VideoHistory testVideoHistory = videoHistoryList.get(videoHistoryList.size() - 1);
        assertThat(testVideoHistory.getTimestamp()).isEqualTo(UPDATED_TIMESTAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingVideoHistory() throws Exception {
        int databaseSizeBeforeUpdate = videoHistoryRepository.findAll().size();

        // Create the VideoHistory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideoHistoryMockMvc.perform(put("/api/video-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(videoHistory)))
            .andExpect(status().isBadRequest());

        // Validate the VideoHistory in the database
        List<VideoHistory> videoHistoryList = videoHistoryRepository.findAll();
        assertThat(videoHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVideoHistory() throws Exception {
        // Initialize the database
        videoHistoryRepository.saveAndFlush(videoHistory);

        int databaseSizeBeforeDelete = videoHistoryRepository.findAll().size();

        // Get the videoHistory
        restVideoHistoryMockMvc.perform(delete("/api/video-histories/{id}", videoHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VideoHistory> videoHistoryList = videoHistoryRepository.findAll();
        assertThat(videoHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideoHistory.class);
        VideoHistory videoHistory1 = new VideoHistory();
        videoHistory1.setId(1L);
        VideoHistory videoHistory2 = new VideoHistory();
        videoHistory2.setId(videoHistory1.getId());
        assertThat(videoHistory1).isEqualTo(videoHistory2);
        videoHistory2.setId(2L);
        assertThat(videoHistory1).isNotEqualTo(videoHistory2);
        videoHistory1.setId(null);
        assertThat(videoHistory1).isNotEqualTo(videoHistory2);
    }
}
