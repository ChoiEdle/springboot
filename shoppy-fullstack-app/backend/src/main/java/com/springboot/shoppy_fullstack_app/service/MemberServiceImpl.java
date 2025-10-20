package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl (MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public int signup (Member member) {
        //패스워드 인코딩
        String encodePwd = passwordEncoder.encode(member.getPwd());   //UUID 타입으로 생성됨
        member.setPwd(encodePwd);
        System.out.println("encodePwd " + encodePwd + " " + encodePwd.length());
        
        return memberRepository.save(member);
//        return 0;
    }

    @Override
    public boolean idCheck (String id) {
        boolean result = false;
        Long count = memberRepository.findId(id);
        if(count == 1) result = true;
        return result;
    }

    @Override
    public boolean login (Member member) {
        String encodePwd = memberRepository.login(member.getId());
        boolean result = passwordEncoder.matches(member.getPwd(), encodePwd);
//        System.out.println(encodePwd);
//        if(rows == 1) result = true;
        return result;
    }
}
