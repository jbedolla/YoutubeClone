package rocks.zipcode.io.repository;
import rocks.zipcode.io.domain.Browse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
/**
 * Spring Data  repository for the Browse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrowseRepository extends JpaRepository<Browse, Long> {

}
