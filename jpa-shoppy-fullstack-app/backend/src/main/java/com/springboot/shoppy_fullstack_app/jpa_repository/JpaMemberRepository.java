package com.springboot.shoppy_fullstack_app.jpa_repository;

import com.springboot.shoppy_fullstack_app.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository     //interface를 구현하는 클래스를 생성하는 작업은 Spring Data JPA -> 서버 부팅시 컨테이너에 생성 후 로딩
public interface JpaMemberRepository extends JpaRepository<Member, String> {
//    Member save(Member member);   //생략가능 : 상속한 부모인터페이스에 save 메소드 존재
    Optional<Long> findById(String id);
}
