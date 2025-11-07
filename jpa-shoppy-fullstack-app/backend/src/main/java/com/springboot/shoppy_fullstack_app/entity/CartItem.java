package com.springboot.shoppy_fullstack_app.entity;

import com.springboot.shoppy_fullstack_app.dto.CartItemDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="cart")
@Setter
@Getter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String size;
    private int qty;
    private int pid;
    private String id;
    private LocalDate cdate;

    //DTO => Entity 변환
    public CartItem () {}
    public CartItem (CartItemDto cartItemDto) {
        this.cid = cartItemDto.getCid();
        this.size = cartItemDto.getSize();
        this.qty = cartItemDto.getQty();
        this.pid = cartItemDto.getPid();
        this.id = cartItemDto.getId();
        this.cdate = LocalDate.now();
    }
}
