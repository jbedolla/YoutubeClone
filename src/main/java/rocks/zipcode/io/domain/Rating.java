package rocks.zipcode.io.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Rating.
 */
@Entity
@Table(name = "rating")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "video_id", updatable = false, insertable = false)
    private String videoId;

    @Column(name = "viewer_id")
    private String viewerId;

    @Column(name = "jhi_timestamp")
    private LocalDate timestamp;

    @Column(name = "rating")
    private Long rating;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Video video;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Profile profile;

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

    public Rating videoId(String videoId) {
        this.videoId = videoId;
        return this;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public String getViewerId() {
        return viewerId;
    }

    public Rating viewerId(String viewerId) {
        this.viewerId = viewerId;
        return this;
    }

    public void setViewerId(String viewerId) {
        this.viewerId = viewerId;
    }

    public LocalDate getTimestamp() {
        return timestamp;
    }

    public Rating timestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public Long getRating() {
        return rating;
    }

    public Rating rating(Long rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public Video getVideo() {
        return video;
    }

    public Rating video(Video video) {
        this.video = video;
        return this;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

    public Profile getProfile() {
        return profile;
    }

    public Rating profile(Profile profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
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
        Rating rating = (Rating) o;
        if (rating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rating{" +
            "id=" + getId() +
            ", videoId='" + getVideoId() + "'" +
            ", viewerId='" + getViewerId() + "'" +
            ", timestamp='" + getTimestamp() + "'" +
            ", rating=" + getRating() +
            "}";
    }
}
