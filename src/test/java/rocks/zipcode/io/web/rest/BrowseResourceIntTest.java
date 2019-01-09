package rocks.zipcode.io.web.rest;

import rocks.zipcode.io.ZipFlix2App;

import rocks.zipcode.io.domain.Browse;
import rocks.zipcode.io.repository.BrowseRepository;
import rocks.zipcode.io.service.BrowseService;
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
import java.util.List;


import static rocks.zipcode.io.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BrowseResource REST controller.
 *
 * @see BrowseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ZipFlix2App.class)
public class BrowseResourceIntTest {

    private static final String DEFAULT_VIDEO_ID = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_ID = "BBBBBBBBBB";

    private static final String DEFAULT_THUMBNAIL = "AAAAAAAAAA";
    private static final String UPDATED_THUMBNAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    @Autowired
    private BrowseRepository browseRepository;

    @Autowired
    private BrowseService browseService;

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

    private MockMvc restBrowseMockMvc;

    private Browse browse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BrowseResource browseResource = new BrowseResource(browseService);
        this.restBrowseMockMvc = MockMvcBuilders.standaloneSetup(browseResource)
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
    public static Browse createEntity(EntityManager em) {
        Browse browse = new Browse()
            .videoId(DEFAULT_VIDEO_ID)
            .thumbnail(DEFAULT_THUMBNAIL)
            .category(DEFAULT_CATEGORY);
        return browse;
    }

    @Before
    public void initTest() {
        browse = createEntity(em);
    }

    @Test
    @Transactional
    public void createBrowse() throws Exception {
        int databaseSizeBeforeCreate = browseRepository.findAll().size();

        // Create the Browse
        restBrowseMockMvc.perform(post("/api/browses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(browse)))
            .andExpect(status().isCreated());

        // Validate the Browse in the database
        List<Browse> browseList = browseRepository.findAll();
        assertThat(browseList).hasSize(databaseSizeBeforeCreate + 1);
        Browse testBrowse = browseList.get(browseList.size() - 1);
        assertThat(testBrowse.getVideoId()).isEqualTo(DEFAULT_VIDEO_ID);
        assertThat(testBrowse.getThumbnail()).isEqualTo(DEFAULT_THUMBNAIL);
        assertThat(testBrowse.getCategory()).isEqualTo(DEFAULT_CATEGORY);
    }

    @Test
    @Transactional
    public void createBrowseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = browseRepository.findAll().size();

        // Create the Browse with an existing ID
        browse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrowseMockMvc.perform(post("/api/browses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(browse)))
            .andExpect(status().isBadRequest());

        // Validate the Browse in the database
        List<Browse> browseList = browseRepository.findAll();
        assertThat(browseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBrowses() throws Exception {
        // Initialize the database
        browseRepository.saveAndFlush(browse);

        // Get all the browseList
        restBrowseMockMvc.perform(get("/api/browses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(browse.getId().intValue())))
            .andExpect(jsonPath("$.[*].videoId").value(hasItem(DEFAULT_VIDEO_ID.toString())))
            .andExpect(jsonPath("$.[*].thumbnail").value(hasItem(DEFAULT_THUMBNAIL.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())));
    }
    
    @Test
    @Transactional
    public void getBrowse() throws Exception {
        // Initialize the database
        browseRepository.saveAndFlush(browse);

        // Get the browse
        restBrowseMockMvc.perform(get("/api/browses/{id}", browse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(browse.getId().intValue()))
            .andExpect(jsonPath("$.videoId").value(DEFAULT_VIDEO_ID.toString()))
            .andExpect(jsonPath("$.thumbnail").value(DEFAULT_THUMBNAIL.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBrowse() throws Exception {
        // Get the browse
        restBrowseMockMvc.perform(get("/api/browses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBrowse() throws Exception {
        // Initialize the database
        browseService.save(browse);

        int databaseSizeBeforeUpdate = browseRepository.findAll().size();

        // Update the browse
        Browse updatedBrowse = browseRepository.findById(browse.getId()).get();
        // Disconnect from session so that the updates on updatedBrowse are not directly saved in db
        em.detach(updatedBrowse);
        updatedBrowse
            .videoId(UPDATED_VIDEO_ID)
            .thumbnail(UPDATED_THUMBNAIL)
            .category(UPDATED_CATEGORY);

        restBrowseMockMvc.perform(put("/api/browses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBrowse)))
            .andExpect(status().isOk());

        // Validate the Browse in the database
        List<Browse> browseList = browseRepository.findAll();
        assertThat(browseList).hasSize(databaseSizeBeforeUpdate);
        Browse testBrowse = browseList.get(browseList.size() - 1);
        assertThat(testBrowse.getVideoId()).isEqualTo(UPDATED_VIDEO_ID);
        assertThat(testBrowse.getThumbnail()).isEqualTo(UPDATED_THUMBNAIL);
        assertThat(testBrowse.getCategory()).isEqualTo(UPDATED_CATEGORY);
    }

    @Test
    @Transactional
    public void updateNonExistingBrowse() throws Exception {
        int databaseSizeBeforeUpdate = browseRepository.findAll().size();

        // Create the Browse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBrowseMockMvc.perform(put("/api/browses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(browse)))
            .andExpect(status().isBadRequest());

        // Validate the Browse in the database
        List<Browse> browseList = browseRepository.findAll();
        assertThat(browseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBrowse() throws Exception {
        // Initialize the database
        browseService.save(browse);

        int databaseSizeBeforeDelete = browseRepository.findAll().size();

        // Get the browse
        restBrowseMockMvc.perform(delete("/api/browses/{id}", browse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Browse> browseList = browseRepository.findAll();
        assertThat(browseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Browse.class);
        Browse browse1 = new Browse();
        browse1.setId(1L);
        Browse browse2 = new Browse();
        browse2.setId(browse1.getId());
        assertThat(browse1).isEqualTo(browse2);
        browse2.setId(2L);
        assertThat(browse1).isNotEqualTo(browse2);
        browse1.setId(null);
        assertThat(browse1).isNotEqualTo(browse2);
    }
}
