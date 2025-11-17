package com.springboot.shoppy_fullstack_app.repositoryNonono;

import com.springboot.shoppy_fullstack_app.dto.MemberDto;

import java.util.Optional;

public interface MemberRepository {
    Optional<MemberDto> findByMember(String id);
    int save (MemberDto member);
    Long findId (String id);
    String login (String id);
}
