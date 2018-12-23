package rocks.zipcode.io.repository;

import rocks.zipcode.io.domain.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @Query("select profile from Profile profile where profile.user.login = ?#{principal.username}")
    List<Profile> findByUserIsCurrentUser();

    @Query(value = "select distinct profile from Profile profile left join fetch profile.friends",
        countQuery = "select count(distinct profile) from Profile profile")
    Page<Profile> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct profile from Profile profile left join fetch profile.friends")
    List<Profile> findAllWithEagerRelationships();

    @Query("select profile from Profile profile left join fetch profile.friends where profile.id =:id")
    Optional<Profile> findOneWithEagerRelationships(@Param("id") Long id);

}
