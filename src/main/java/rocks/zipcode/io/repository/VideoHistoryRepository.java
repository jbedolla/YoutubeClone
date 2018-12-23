package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.VideoHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VideoHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoHistoryRepository extends JpaRepository<VideoHistory, Long> {

}
