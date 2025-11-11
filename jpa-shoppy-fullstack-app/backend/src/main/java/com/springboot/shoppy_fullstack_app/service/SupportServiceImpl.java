package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.PageResponseDto;
import com.springboot.shoppy_fullstack_app.dto.SupportDto;
import com.springboot.shoppy_fullstack_app.entity.Support;
import com.springboot.shoppy_fullstack_app.jpa_repository.JpaSupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupportServiceImpl implements SupportService{

    private JpaSupportRepository jpaSupportRepository;

    @Autowired
    public SupportServiceImpl(JpaSupportRepository jpaSupportRepository) {
        this.jpaSupportRepository = jpaSupportRepository;
    }

    @Override
    public PageResponseDto<SupportDto> findSearchAll(SupportDto supportDto) {
        System.out.println(supportDto.getType() + ", " + supportDto.getKeyword());
        return null;
    }

    @Override
    public PageResponseDto<SupportDto> findAll(SupportDto support) {
        int currentPage = support.getCurrentPage()-1;
        int pageSize = support.getPageSize();
        String stype = support.getStype();
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        Page<Support> list = null;
        if(support.getStype().equals("all")) {
            list = jpaSupportRepository.findAll(pageable);
        } else {
            list = jpaSupportRepository.findByType(stype, pageable);
        }

        List<SupportDto> resultList = new ArrayList<>();
        //entity <=> Dto, rowNumber 추가
        int offset = pageSize * currentPage;
        for(int i=0; i<list.getContent().size(); i++) {
            SupportDto dto = new SupportDto(list.getContent().get(i));
            dto.setRowNumber(offset + i + 1);   //행번호 추가
            resultList.add(dto);
        }

//        list.getContent().forEach(entity -> resultList.add(new SupportDto(entity)));
        return new PageResponseDto<>(
                resultList,
                list.getTotalElements(),
                list.getTotalPages(),
                list.getNumber()
        );
    }
}