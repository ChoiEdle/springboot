package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.Member;
import lombok.Data;

@Data
public class MemberDto {
    private String id;
    private String pwd;
    private String name;
    private String phone;
    private String email;

    //Member 엔티티의 결과를 저장하기 위한 생성자 정의
    public MemberDto() {}
    public MemberDto(String id, String pwd) {
        this.id = id;
        this.pwd = pwd;
    }

    public MemberDto(Member member) {
        this.id = member.getId();
        this.pwd = member.getPwd();
        this.name = member.getName();
        this.phone = member.getPhone();
        this.email = member.getEmail();
    }

}
