package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class JdbcTemplateCartRepository implements CartRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateCartRepository (DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public int add(CartItem cartItem) {
        String sql = "insert into cart(size, qty, pid, id, cdate) values(?, ?, ?, ?, now())";
        Object[] params = {
                cartItem.getSize(), cartItem.getQty(), cartItem.getPid(), cartItem.getId()
        };
        return jdbcTemplate.update(sql, params);
    }
}
