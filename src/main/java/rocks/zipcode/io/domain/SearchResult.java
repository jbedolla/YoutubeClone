package rocks.zipcode.io.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SearchResult.
 */
@Entity
@Table(name = "search_result")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SearchResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "video_id")
    private String videoId;

    @Column(name = "jhi_link")
    private String link;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "category")
    private String category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoId() {
        return videoId;
    }

    public SearchResult videoId(String videoId) {
        this.videoId = videoId;
        return this;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getLink() {
        return link;
    }

    public SearchResult link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public SearchResult thumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
        return this;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getCategory() {
        return category;
    }

    public SearchResult category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SearchResult searchResult = (SearchResult) o;
        if (searchResult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), searchResult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SearchResult{" +
            "id=" + getId() +
            ", videoId='" + getVideoId() + "'" +
            ", link='" + getLink() + "'" +
            ", thumbnail='" + getThumbnail() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
