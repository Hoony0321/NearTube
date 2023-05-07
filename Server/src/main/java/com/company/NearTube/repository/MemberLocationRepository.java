package com.company.NearTube.repository;

import com.company.NearTube.domain.MemberLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberLocationRepository extends JpaRepository<MemberLocation, Long> {
}
